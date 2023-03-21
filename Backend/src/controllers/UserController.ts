import AppDataSource from "../data-source";
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/User';


class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async list(req: Request, res: Response): Promise<Response> {
        const response: any = await AppDataSource.getRepository(User).find({
            order: {
                id: 'asc'
            }
        });
        return res.json(response);
    }


    public async one(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        const usuario: any = await AppDataSource.manager.findOneBy(User, { id }).catch((e) => {
        })
        return res.json(usuario);
    }


    public async create(req: Request, res: Response): Promise<Response> {
        const { firstName, lastName, age } = req.body;

        const obj = new User();
        obj.firstName = firstName;
        obj.lastName = lastName;
        obj.age = age;

        const usuario: any = await AppDataSource.manager.save(User, obj).catch((e) => {

        })
        if (usuario.id) {

            return res.json({
                id: usuario.id,
                firstName: usuario.firstName,
                lastName: usuario.lastName,
                age: usuario.age
            });
        }
        return res.json(usuario);

    }
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, firstName, lastName, age } = req.body;
     
        const usuario: any = await AppDataSource.manager.findOneBy(User, { id }).catch((e) => {
          return { error: "Identificador inválido" };
        })
        if (usuario && usuario.id) {
          if (firstName !== "") {
            usuario.firstName = firstName;
          }
          if (lastName !== "") {
            usuario.lastName = lastName;
          }
          if (age !== "") {
            usuario.age = age;
          }
          const r = await AppDataSource.manager.save(User, usuario).catch((e) => {
            // testa se o e-mail é repetido
            if (/(firstName)[\s\S]+(already exists)/.test(e.detail)) {
              return ({ error: 'first name already exists' });
            }
            return e;
          })
          if (!r.error) {
            return res.json({ id: usuario.id, firstName: usuario.firstName });
          }
          return res.json(r);
        }
        else if (usuario && usuario.error) {
          return res.json(firstName)
        }
        else {
          return res.json({ error: "Usuário não localizado" });
        }
      }


    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body
        const usuario: any = await AppDataSource.manager.findOneBy(User, { id }).catch((e) => {
            return { error: "Identificador inválido" }
        })

        if (usuario && usuario.id) {
            const r = await AppDataSource.manager.remove(User, usuario).catch((e) => e.message)
            return res.json(r)
        }
        else if (usuario && usuario.error) {
            return res.json(usuario)
        }
        else {
            return res.json({ error: "Usuario não localizado" })
        }

        
    }




} export default new UserController();