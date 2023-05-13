import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Ticket } from "../entities/Ticket";
import { IsUndefined } from "../utils/global";
import * as jwt from "jsonwebtoken";
import UserController from "./UserController";
import { User } from "../entities/Users";
import { Log } from "../entities/Log";
import LogController from "./LogController";


class TicketController {
  async list(req: Request, res: Response): Promise<Response> {
    let email = jwt.decode(req.cookies.jwt);
    const user = await AppDataSource.getRepository(User).findOneBy({ email: email ? email.toString() : "" })

    const ticketTable = await AppDataSource.getRepository(Ticket)

    const ticket = await ticketTable.findBy({ user: false })

    return res.json("");
  }


  public async update(req: Request, res: Response): Promise<Response> {
    const { id, title, type, description, status, inspectionGroup } = req.body;
    const ticketRepository = AppDataSource.getRepository(Ticket)
    const ticketToUpdate = await ticketRepository.findOne({
      where: { id: id },
      relations: {
        inspectionGroup: true
      }
    },)
    ticketToUpdate.title = title;
    ticketToUpdate.type = type;
    ticketToUpdate.description = description;
    ticketToUpdate.status = status;
    ticketToUpdate.inspectionGroup = inspectionGroup;

    await ticketRepository.save(ticketToUpdate).catch((e) => { })
    await TicketController.createLog(ticketToUpdate, "6", req);
    return res.json(ticketToUpdate)


  }

  async status(req: Request, res: Response): Promise<Response> {
    const { status } = req.body;
    const ticketRepository = AppDataSource.getRepository(Ticket)

    const ticket = await ticketRepository.findBy({ status: status })

    if (IsUndefined(status)) {
      return res.json(status);
    }

    return res.json(ticket);
  }


  public async one(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const usuario: any = await AppDataSource.manager.findOneBy(Ticket, { id }).catch((e) => {
    })
    return res.json(usuario);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { type, title, description, status, inspectionGroup } = req.body;

    let email = jwt.decode(req.cookies.jwt);

    const user: any = await AppDataSource.getRepository(User).findOneBy({ email: email ? email.toString() : "" })

    const obj = new Ticket()
    obj.type = type;
    obj.title = title;
    obj.description = description;
    obj.status = status;
    obj.user = user;
    obj.logs = null;
    console.log(obj)
    const ticket: any = await AppDataSource.manager.save(Ticket, obj).catch((e) => {
      console.log(e)
      return res.json({ error: "Erro ao salvar o Chamado" });
    })
    if (ticket.id) {
      await TicketController.createLog(ticket, "1", req);

      return res.json({
        id: ticket.id,
        type: ticket.type,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status
      });
    }


  }


  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const ticket: any = await AppDataSource.manager.findOneBy(Ticket, { id }).catch((e) => {
      return { error: "Identificador inválido" }
    })

    if (ticket && ticket.id) {
      const r = await AppDataSource.manager.remove(Ticket, ticket).catch((e) => e.message)
      return res.json(r)
    }
    else if (ticket && ticket.error) {
      return res.json(ticket)
    }
    else {
      return res.json({ error: "Ticket não localizado" })
    }


  }


  public async deleteAll(req: Request, res: Response): Promise<Response> {
    const r = await AppDataSource.getRepository(Ticket);
    await r.clear()
    return res.json(r.count)
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    var status = req.params.status
    var query = "SELECT id, type, title, description FROM ticket where status = '" + status + "'";
    let email = jwt.decode(req.cookies.jwt);
    const user = await AppDataSource.getRepository(User).findOneBy({ email: email ? email.toString() : "" });
    if (user && user.role && user.role == 3) {
      query = "SELECT id, type, title, description FROM ticket where status = " + status + " and userId = " + user.id;
    }
    const ticket: any = await AppDataSource.manager.query(query)
    return res.json(ticket)
  }
  public async updateStatus(req: Request, res: Response): Promise<Response> {
    const { id, status } = req.body;
    const ticket: any = await AppDataSource.manager.findOneBy(Ticket, { id }).catch((e) => {
      return { error: "identificador inválido" };
    })
    if (ticket && ticket.id) {
      if (status !== "") {
        ticket.status = status;
      }
      const r = await AppDataSource.manager.save(ticket, ticket).catch((e) => {
        return e;
      })
      if (!r.error) {
        return res.json({ id: ticket.id });
      }
      return res.json(r);
    }
    else if (ticket && ticket.error) {
      return res.json({ error: "Atualizando o status" })
    }
    else {
      return res.json({ error: "Chamado não encontrado" });
    }
  }
  public async getKanbanItem(req: Request, res: Response): Promise<Response> {
    var query = "SELECT id, type, title, status, description FROM ticket WHERE status = '3' ";
    let email = jwt.decode(req.cookies.jwt);
    const user = await AppDataSource.getRepository(User).findOneBy({ email: email ? email.toString() : "" });
    if (user && user.role && user.role == 3) {
      query = "SELECT id, type, title, status, description FROM ticket WHERE status NOT IN ('1','2') and userId = " + user.id;
    }
    const ticket: any = await AppDataSource.manager.query(query)
    return res.json(ticket)
  }
  public async getLogs(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    var logQuery = `SELECT "Log"."date" AS "date", "Log"."value" AS "nota", "Log"."action" AS "action", "Log"."ticketsId" AS "ticketsId", "Log"."usersId" AS "usersId" , "user"."name" AS "userName" FROM "log" "Log" JOIN "public"."user" "user" on "user"."id" = "Log"."usersId" where "Log"."ticketsId"= ${id} order by "date" DESC`
    const logs: any = await AppDataSource.manager.query(logQuery);

    console.log(logs)

    return res.json(logs)
  }
  public async avaliar(req: Request, res: Response): Promise<Response> {
    //id, tipo, nota
    //1-risco; 2-impacto; 3-custo
    const { data, id } = req.body;
    const ticketRepository = AppDataSource.getRepository(Ticket)

    const ticket = await AppDataSource.getRepository(Ticket).findOneBy({ id: id })

    for (var item of data) {
      if (item.tipo == 1) {
        if (item.nota == "3") {
          ticket.status = '2'
          ticket.risk = item.nota
          await ticketRepository.save(ticket)
          await TicketController.createLog(ticket, '7', req, item.nota)
          await TicketController.createLog(ticket, '5', req)
          return res.json({ true: true })
        } else {
          ticket.risk = item.nota
          await ticketRepository.save(ticket)
          await TicketController.createLog(ticket, '7', req, item.nota)
          await TicketController.createLog(ticket, '2', req, item.nota)

        }

      } if (item.tipo == 2) {
        if (item.nota == "0") {
          ticket.status = '2'
          ticket.impact = item.nota
          await ticketRepository.save(ticket)
          await TicketController.createLog(ticket, '8', req, item.nota)
          await TicketController.createLog(ticket, '5', req)
          return res.json({ true: true })
        } else {
          ticket.impact = item.nota
          await ticketRepository.save(ticket)
          await TicketController.createLog(ticket, '8', req, item.nota)
          await TicketController.createLog(ticket, '3', req, item.nota)
        }

      } if (item.tipo == 3) {
        if (item.nota == "3") {
          ticket.status = '2'
          ticket.cost = item.nota
          await ticketRepository.save(ticket)
          await TicketController.createLog(ticket, '9', req, item.nota)
          await TicketController.createLog(ticket, '5', req)
          return res.json({ true: true })
        } else {
          ticket.cost = item.nota
          await ticketRepository.save(ticket)
          await TicketController.createLog(ticket, '9', req, item.nota)
          await TicketController.createLog(ticket, '4', req, item.nota)
        }
      }
    } if (ticket.risk != null && ticket.cost != null && ticket.impact != null) {
      if (ticket.risk != '3' && ticket.impact != '0') {
        ticket.status = '3'
        await ticketRepository.save(ticket)
      }
    }

    return res.json({ true: true });
  }
  public static async createLog(ticket: any, acao: string, req: any, value = "") {
    let email = jwt.decode(req.cookies.jwt);
    const user: any = await AppDataSource.getRepository(User).findOneBy({ email: email ? email.toString() : "" });
    var log = new Log();

    log.action = acao;
    log.date = new Date();
    log.tickets = ticket;
    log.users = user
    log.value = value
    const newLog: any = await AppDataSource.manager.save(Log, log).catch((e) => { })
  }


} export default new TicketController();