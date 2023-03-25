import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import {Ticket } from "../entities/Ticket";
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
        const { id, title, type, description, status } = req.body;
        const ticket: any = await AppDataSource.manager.findOneBy(Ticket, { id }).catch((e) => {
          return { error: "Identificador inválido" };
        })
        if (ticket && ticket.id) {
          if (title !== "") {
            ticket.title = title;
          }
          if (type !== "") {
            ticket.type = type;
          }
          if (description !== "") {
            ticket.description = description;
          }
          if (status !== "") {
            ticket.status = status;
          }
          const r = await AppDataSource.manager.save(ticket, ticket).catch((e) => {
            if (/(title)[\s\S]+(already exists)/.test(e.detail)) {
              return ({ error: ' title already exists' });
            }
            return e;
          })
          if (!r.error) {
            return res.json({ id: ticket.id });
          }
          return res.json(r);
        }
        else if (ticket && ticket.error) {
          return res.json(title)
        }
        else {
          return res.json({ error: "Usuário não localizado" });
        }
      }



    async status(req: Request, res: Response): Promise<Response>{
        const {status} = req.body;
        const ticketRepository = AppDataSource.getRepository(Ticket)

        const ticket = await ticketRepository.findBy({status: status})

        if(IsUndefined(status)){
          return res.json(status);
        }

        return res.json(ticket);
    }

    public async one(req: Request, res: Response): Promise<Response> {
        const id  = parseInt(req.params.id);
        const usuario: any = await AppDataSource.manager.findOneBy(Ticket, { id }).catch((e) => {
        })
        console.log(usuario)
        return res.json(usuario);
    }


    public async create(req: Request, res: Response): Promise<Response> {
        const { type, title, description, status } = req.body;

        const obj = new Ticket();
        obj.type = type;
        obj.title = title;
        obj.description = description;
        obj.status = status;

        const ticket: any = await AppDataSource.manager.save(Ticket, obj).catch((e) => {

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
        return res.json(ticket);

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
            return res.json({ error: "Usuario não localizado" })
        }

        
    }


}export default new TicketController();