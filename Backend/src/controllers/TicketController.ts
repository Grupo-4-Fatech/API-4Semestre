import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Ticket } from "../entities/Ticket";
import { IsUndefined } from "../utils/global";
import * as jwt from "jsonwebtoken";
import { User } from "../entities/Users";
import { Log } from "../entities/Log";


class TicketController {
  async list(req: Request, res: Response): Promise<Response> {
    const ticketTable = await AppDataSource.getRepository(Ticket)

    const ticket = await ticketTable.find()

    return res.json(ticket);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, title, type, description, status, inspectionGroup, interessados } = req.body;
    const ticketRepository = AppDataSource.getRepository(Ticket)
    const ticketToUpdate = await ticketRepository.findOne({
      where: { id: id },
      relations: {
        inspectionGroup: true,
        user: true
      }
    },)
    ticketToUpdate.title = title;
    ticketToUpdate.type = type;
    ticketToUpdate.description = description;
    ticketToUpdate.status = status;
    ticketToUpdate.inspectionGroup = inspectionGroup;
    ticketToUpdate.interested = interessados;

    await ticketRepository.save(ticketToUpdate).catch((e) => { })
    await TicketController.createLog(ticketToUpdate, "6", req);
    await TicketController.notifica(ticketToUpdate, "Atualizado", req);
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
    console.log(usuario)
    return res.json(usuario);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { type, title, description, status, interessados } = req.body;

    let email = jwt.decode(req.cookies.jwt);

    const user: any = await AppDataSource.getRepository(User).findOneBy({ email: email ? email.toString() : "" })

    const obj = new Ticket()
    obj.type = type;
    obj.title = title;
    obj.description = description;
    obj.status = status;
    obj.user = user;
    obj.logs = null;
    obj.interested = interessados;
    console.log(obj)
    const ticket: any = await AppDataSource.manager.save(Ticket, obj).catch((e) => {
      console.log(e)
      return res.json({ error: "Erro ao salvar o Chamado" });
    })
    if (ticket.id) {
      await TicketController.createLog(ticket, "1", req);
      await TicketController.notifica(ticket, "Criado", req);

      return res.json({
        id: ticket.id,
        type: ticket.type,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status
      });
    }


  }


  public async delete(req: Request, res: Response) {
    const { id } = req.body

    const ticketTable = await AppDataSource.getRepository(Ticket);
    const ticket: Ticket = await ticketTable.findOne({ where: { id: id }, relations: { user: true } })
    const log: Log[] = await AppDataSource.getRepository(Log).findBy({ tickets: id })
    await log.forEach(log => AppDataSource.getRepository(Log).remove(log))

    ticketTable.remove(ticket);
    console.log(ticket)
  }


  public async deleteAll(req: Request, res: Response): Promise<Response> {
    const r = await AppDataSource.getRepository(Ticket);
    await r.clear()
    return res.json(r.count)
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    var status = req.params.status
    var query;
    let email = jwt.decode(req.cookies.jwt);
    const user = await AppDataSource.getRepository(User).findOneBy({ email: email ? email.toString() : "" });
    if (user.role == 3) {
      query = `SELECT id, type, title, risk, impact, cost ,description FROM ticket where status = '${status}' and "userId" = ${user.id}`;
      const ticket: any = await AppDataSource.manager.query(query)
      return res.json(ticket);
    }
    query = "SELECT id, type, title, risk, impact, cost , description FROM ticket where status = '" + status + "'";
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

  public async updateSolution(req: Request, res: Response): Promise<Response> {
    const { id, solution } = req.body;
    const ticket: any = await AppDataSource.manager.findOneBy(Ticket, { id }).catch((e) => {
      return { error: "identificador inválido" };
    })
    if (ticket && ticket.id) {
      if (solution !== "") {
        ticket.solution = solution;
      }
      const r = await AppDataSource.manager.save(Ticket, ticket).catch((e) => {
        return e;
      })
      if (!r.error) {
        return res.json({ id: ticket.id });
      }
      return res.json(r);
    }
    else if (ticket && ticket.error) {
      return res.json({ error: "Atualizando a solucão" })
    }
    else {
      return res.json({ error: "Chamado não encontrado" });
    }
  }
  public async getKanbanItem(req: Request, res: Response): Promise<Response> {
    var query = "SELECT id, type, title, status, solution, description FROM ticket WHERE status NOT IN ('1','2')";
    let email = jwt.decode(req.cookies.jwt);
    const user = await AppDataSource.getRepository(User).findOneBy({ email: email ? email.toString() : "" });
    if (user && user.role && user.role == 3) {
      query = `SELECT id, type, title, status, solution, description FROM ticket WHERE status NOT IN ('1','2') and "userId" = ` + user.id;
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

    const ticket = await AppDataSource.getRepository(Ticket).findOne({ where: { id: id }, relations: { user: true } })
    console.log(data)

    for (var item of data) {
      if (item.tipo == 1) {
        if (item.nota == "3") {
          ticket.status = '2'
          ticket.risk = item.nota
          await ticketRepository.save(ticket)
          await TicketController.createLog(ticket, '7', req, item.nota)
          await TicketController.createLog(ticket, '5', req)
          await TicketController.notifica(ticket, 'Arquivado risco', req)

          return res.json({ arquivado: true })
        } else {
          ticket.risk = item.nota
          await ticketRepository.save(ticket)
          await TicketController.createLog(ticket, '7', req, item.nota)
          await TicketController.createLog(ticket, '2', req, item.nota)
          await TicketController.notifica(ticket, 'Aprovado Risco', req)

        }

      } if (item.tipo == 2) {
        if (item.nota == "0") {
          ticket.status = '2'
          ticket.impact = item.nota
          await ticketRepository.save(ticket)
          await TicketController.createLog(ticket, '8', req, item.nota)
          await TicketController.createLog(ticket, '5', req)
          await TicketController.notifica(ticket, 'Arquivado impacto', req)
          return res.json({ arquivado: true })
        } else {
          ticket.impact = item.nota
          await ticketRepository.save(ticket)
          await TicketController.createLog(ticket, '8', req, item.nota)
          await TicketController.createLog(ticket, '3', req, item.nota)
          await TicketController.notifica(ticket, 'Aprovado impacto', req)
        }

      } if (item.tipo == 3) {
        if (item.nota == "3") {
          ticket.status = '2'
          ticket.cost = item.nota
          await ticketRepository.save(ticket)
          await TicketController.createLog(ticket, '9', req, item.nota)
          await TicketController.createLog(ticket, '5', req)
          await TicketController.notifica(ticket, 'Arquivado custo ', req)
          return res.json({ true: true })
        } else {
          ticket.cost = item.nota
          await ticketRepository.save(ticket)
          await TicketController.createLog(ticket, '9', req, item.nota)
          await TicketController.createLog(ticket, '4', req, item.nota)
          await TicketController.notifica(ticket, 'Aprovado custo', req)
        }
      }
    } if (ticket.risk && ticket.cost && ticket.impact) {
      console.log(ticket)
      if (ticket.risk != '3' && ticket.impact != '0') {
        ticket.status = '3'
        await ticketRepository.save(ticket)
        return res.json({ aprovado: true });
      }
    }

    return res.json({ true: true });
  }

  public static async notifica(ticket: any, acao: string, req: Request) {
    var data = new Date()
    let email = jwt.decode(req.cookies.jwt);
    const user: any = await AppDataSource.getRepository(User).findOneBy({ email: email ? email.toString() : "" });


    var conteudoEmail = {
      service_id: "service_o2xt645",
      template_id: "template_bxybvbx",
      user_id: "OGaRTlk8Ij5luGzrf",
      template_params: {
        email: ticket.user.email,
        nome: user.name,
        acaoUsu: acao,
        tituloTicket: ticket.title,
        data: data.toLocaleString('pt-BR')
      }
    }
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(conteudoEmail)
    }).then(function (response) {
      console.log('SUCCESS!', response.status, response.statusText);
    }, function (error) {
      console.log('FAILED...', error);
    });

    for (var Email of ticket.interested) {
      conteudoEmail = {
        service_id: "service_o2xt645",
        template_id: "template_bxybvbx",
        user_id: "OGaRTlk8Ij5luGzrf",
        template_params: {
          email: Email,
          nome: user.name,
          acaoUsu: acao,
          tituloTicket: ticket.title,
          data: data.toLocaleString('pt-BR')
        }
      }
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(conteudoEmail)
      }).then(function (response) {
        console.log('SUCCESS!', response.status, response.statusText);
      }, function (error) {
        console.log('FAILED...', error);
      });
    }
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
  async ticketrole(req: Request, res: Response): Promise<Response> {
    const repository = await AppDataSource.getRepository(Ticket)

    const result = {};
    for (let n = 1; n <= 3; n++) {
      const response = await repository
        .createQueryBuilder("ticket")
        .select("COUNT(*)", "count")
        .where("ticket.status = :status", { status: n })
        .groupBy("ticket.status")
        .getRawOne();

      result[n] = response.count;
    }
    return res.json(result);
  }

  async ticketcountold(req: Request, res: Response): Promise<Response> {
    const ticketRepository = AppDataSource.getRepository(Ticket);

    const result = [];
    const tickets = await ticketRepository
      .createQueryBuilder('ticket')
      .leftJoin('ticket.user', 'user') // Realizando uma junção entre as tabelas Ticket e User
      .select('user.name', 'userName') // Selecionando o nome do usuário
      .addSelect('COUNT(*)', 'count')
      .groupBy('user.name') // Alterando para agrupar pelo nome do usuário
      .getRawMany();

    tickets.forEach((ticket) => {
      const userName = ticket.userName; // Obtendo o nome do usuário
      const count = parseInt(ticket.count); // Convertendo para um número inteiro
      result.push({ user: userName, count });
    });

    return res.json(result);
  }

  public async ticketcount(req: Request, res: Response): Promise<Response> {

    let query = `SELECT "user"."name" AS "x", CAST(COUNT("ticket"."id") AS INTEGER) AS "y" FROM "ticket" INNER JOIN "user" ON "user"."id"="ticket"."userId" GROUP BY "user"."name" ;`;
    const contagem: any = await AppDataSource.manager.query(query)
    return res.json(contagem)

  }

  public async ticketperStatus(req: Request, res: Response): Promise<Response> {

    let query = `
    SELECT
      CASE "ticket"."status"
        WHEN '1' THEN 'Esperando aprovação'
        WHEN '2' THEN 'Arquivado'
        WHEN '3' THEN 'Aprovado'
        WHEN '4' THEN 'Em desenvolvimento'
        WHEN '5' THEN 'Concluído'
        ELSE 'Outro'
      END AS "x",
      COUNT("ticket"."id") AS "y",
      CONCAT(CAST(ROUND(100.0 * COUNT("ticket"."id") / SUM(COUNT("ticket"."id")) OVER (), 2) AS TEXT), '%') AS "text"
    FROM
      "ticket"
    INNER JOIN
    "user" ON "user"."id" = "ticket"."userId"
    WHERE
      "ticket"."status" IN ('1', '2', '3', '4', '5')
    GROUP BY
      "ticket"."status";

    `;
    const contagem: any = await AppDataSource.manager.query(query)
    return res.json(contagem)

  }

  async insertInterested(req: Request, res: Response): Promise<Response> {
    const { ticketId, interestedEmails } = req.body;
    const ticketTable = AppDataSource.getRepository(Ticket);

    const interestedList = []

    interestedEmails.forEach(email => interestedList.push(email))

    const ticket = await ticketTable.findOneBy({ id: ticketId })
    ticket.interested = interestedList;

    await ticketTable.save(ticket);

    return res.json(ticket)
  }

} export default new TicketController();