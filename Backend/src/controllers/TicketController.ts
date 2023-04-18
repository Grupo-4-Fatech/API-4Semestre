import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Ticket } from "../entities/Ticket";
import { IsUndefined } from "../utils/global";


class TicketController {

  async list(req: Request, res: Response): Promise<Response> {
    const response: any = await AppDataSource.getRepository(Ticket).find({
      order: {
        id: 'asc'
      }
    });
    return res.json(response);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { id, title, type, description, status, inspectionGroups } = req.body;       
     const ticketRepository = AppDataSource.getRepository(Ticket)
     const ticketToUpdate = await ticketRepository.findOneBy({
         id: id,
     })
     ticketToUpdate.title=title;
     ticketToUpdate.type=type;
     ticketToUpdate.description=description;
     ticketToUpdate.status=status;
     ticketToUpdate.inspectionGroup = inspectionGroups;

     
     await ticketRepository.save(ticketToUpdate)
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
    const { type, title, description, status, inspectionGroups, userId  } = req.body;



    const obj = new Ticket();
    obj.type = type;
    obj.title = title;
    obj.description = description;
    obj.status = status;
    obj.inspectionGroup = inspectionGroups;
    obj.user = userId;

    const ticket: any = await AppDataSource.manager.save(Ticket, obj).catch((e) => {

    })
    if (ticket.id) {

      return res.json({
        id: ticket.id,
        type: ticket.type,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        inspectionGroups: ticket.inspectionGroups
      });
    }
    return res.json({ error: "Error while saving the ticket" });

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

  public async deleteAll(req: Request, res: Response): Promise<Response>{
    const r = await AppDataSource.getRepository(Ticket);
    await r.clear()
    return res.json(r.count)
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    var status = req.params.status
    const ticket: any = await AppDataSource.manager.query("SELECT id, type, title FROM ticket where status = " + status)
    return res.json(ticket)
  }
  public async updateStatus(req: Request, res: Response): Promise<Response> {
    const { id, status } = req.body;
    const ticket: any = await AppDataSource.manager.findOneBy(Ticket, { id }).catch((e) => {
      return { error: "Identificador inválido" };
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
      return res.json({ error: "Updating the status" })
    }
    else {
      return res.json({ error: "Ticket not found" });
    }
  }
  public async getKanbanItem(req: Request, res: Response): Promise<Response> {
    const ticket: any = await AppDataSource.manager.query("SELECT id, type, title, status, description FROM ticket WHERE status NOT IN (1,2)")
    return res.json(ticket)
  }
  

} export default new TicketController();