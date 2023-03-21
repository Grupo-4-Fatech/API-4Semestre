import AppDataSource from "../data-source";
import { NextFunction, Request, Response } from 'express';
import { Call } from "../entities/Call";
import { IsUndefined } from "../utils/global";


class CallController {
    private callRepository = AppDataSource.getRepository("call")

    async list(req: Request, res: Response): Promise<Response> {
        const response: any = await AppDataSource.getRepository(Call).find({
            order: {
                id: 'asc'
            }
        });
        return res.json(response);
    }
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, title, type, description, status } = req.body;
        const call: any = await AppDataSource.manager.findOneBy(Call, { id }).catch((e) => {
          return { error: "Identificador inválido" };
        })
        if (call && call.id) {
          if (title !== "") {
            call.title = title;
          }
          if (type !== "") {
            call.type = type;
          }
          if (description !== "") {
            call.description = description;
          }
          if (status !== "") {
            call.status = status;
          }
          const r = await AppDataSource.manager.save(Call, call).catch((e) => {
            if (/(title)[\s\S]+(already exists)/.test(e.detail)) {
              return ({ error: ' title already exists' });
            }
            return e;
          })
          if (!r.error) {
            return res.json({ id: call.id, mail: call.mail });
          }
          return res.json(r);
        }
        else if (call && call.error) {
          return res.json(title)
        }
        else {
          return res.json({ error: "Usuário não localizado" });
        }
      }



    async status(req: Request, res: Response, next: NextFunction){
        const status = req.params.status

        const call = await this.callRepository.findOne({
            where: {status}
        })

        if(!call){
            return "Not Found"
        }

        return status;
    }

    public async one(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        const usuario: any = await AppDataSource.manager.findOneBy(Call, { id }).catch((e) => {
        })
        return res.json(usuario);
    }


    public async create(req: Request, res: Response): Promise<Response> {
        const { type, title, description, status } = req.body;

        const obj = new Call();
        obj.type = type;
        obj.title = title;
        obj.description = description;
        obj.status = status;

        const call: any = await AppDataSource.manager.save(Call, obj).catch((e) => {

        })
        if (call.id) {

            return res.json({
                id: call.id,
                type: call.type,
                title: call.title,
                description: call.description,
                status: call.status
            });
        }
        return res.json(call);

    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body
        const call: any = await AppDataSource.manager.findOneBy(Call, { id }).catch((e) => {
            return { error: "Identificador inválido" }
        })

        if (call && call.id) {
            const r = await AppDataSource.manager.remove(Call, call).catch((e) => e.message)
            return res.json(r)
        }
        else if (call && call.error) {
            return res.json(call)
        }
        else {
            return res.json({ error: "Usuario não localizado" })
        }

        
    }


}export default new CallController();