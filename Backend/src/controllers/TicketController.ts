import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Ticket } from "../entities/Ticket";
import { IsUndefined } from "../utils/global";
import * as jwt from "jsonwebtoken";
import UserController from "./UserController";
import { User } from "../entities/Users";


class TicketController {

  async list(req: Request, res: Response): Promise<Response> {
    let email =  jwt.decode(req.cookies.jwt);
    const user = await AppDataSource.getRepository(User).findOneBy({email:email.toString()})

    const ticketTable = await AppDataSource.getRepository(Ticket)

    const ticket = await ticketTable.findBy({user: false})

    return res.json("");
  }


  public async update(req: Request, res: Response): Promise<Response> {
    const { id, title, type, description, status, inspectionGroup } = req.body;       
     const ticketRepository = AppDataSource.getRepository(Ticket)
     const ticketToUpdate = await ticketRepository.findOneBy({
         id: id,
     })
     ticketToUpdate.title=title;
     ticketToUpdate.type=type;
     ticketToUpdate.description=description;
     ticketToUpdate.status=status;
     ticketToUpdate.inspectionGroup = inspectionGroup;

     
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
    const { type, title, description, status, inspectionGroup } = req.body;

    let email =  jwt.decode(req.cookies.jwt);

    const user = await AppDataSource.getRepository(User).findOneBy({email:email.toString()})

    const obj = new Ticket()
    obj.type = type;
    obj.title = title;
    obj.description = description;
    obj.status = status;
    obj.user = user;

    const ticket: any = await AppDataSource.manager.save(Ticket, obj).catch((e) => {
      return res.json({ error: "Error while saving the ticket" });
    })
    if (ticket.id) {

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
      return { error: "invalid identifier" }
    })

    if (ticket && ticket.id) {
      const r = await AppDataSource.manager.remove(Ticket, ticket).catch((e) => e.message)
      return res.json(r)
    }
    else if (ticket && ticket.error) {
      return res.json(ticket)
    }
    else {
      return res.json({ error: "Ticket not found" })
    }


  }

  public async deleteAll(req: Request, res: Response): Promise<Response>{
    const r = await AppDataSource.getRepository(Ticket);
    await r.clear()
    return res.json(r.count)
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    var status = req.params.status
    var query  = "SELECT id, type, title FROM ticket where status = " + status;
    let email =  jwt.decode(req.cookies.jwt);
    const user = await AppDataSource.getRepository(User).findOneBy({email:email.toString()});
    if(user.role == 3){
        query  = "SELECT id, type, title FROM ticket where status = " + status + " and userId = "+ user.id;
    }
    const ticket: any = await AppDataSource.manager.query(query)
    return res.json(ticket)
  }
  public async updateStatus(req: Request, res: Response): Promise<Response> {
    const { id, status } = req.body;
    const ticket: any = await AppDataSource.manager.findOneBy(Ticket, { id }).catch((e) => {
      return { error: "invalid identifier" };
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
    var query  = "SELECT id, type, title, status, description FROM ticket WHERE status NOT IN (1,2)";
    let email =  jwt.decode(req.cookies.jwt);
    const user = await AppDataSource.getRepository(User).findOneBy({email:email.toString()});
    console.log(user)
    if(user.role == 3){
        query  = "SELECT id, type, title, status, description FROM ticket WHERE status NOT IN (1,2) and userId = "+ user.id;
    }
    const ticket: any = await AppDataSource.manager.query(query)
    return res.json(ticket)
  }
  

} export default new TicketController();