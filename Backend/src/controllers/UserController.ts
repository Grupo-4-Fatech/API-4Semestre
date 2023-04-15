import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from "../entities/Users";


class UserController {
    async listUser(req: Request, res: Response): Promise<Response> {
        const response: any = await AppDataSource.getRepository(User).find({
        });
        return res.json(response);
    }
    public async updateUser(req: Request, res: Response): Promise<Response> {
        const { id, name, email, password, gender } = req.body;
        const collection = AppDataSource.getRepository(User)
        const renew = await collection.findOneBy({
            id: id,
        })
        renew.name = name;
        renew.email = email;
        renew.password = password;
        renew.gender = gender;

        await collection.save(renew)
        return res.json(renew)
    }
    public async createUser(req: Request, res: Response): Promise<Response> {
        const { name, email, password, gender } = req.body;

        const object = new User();
        object.name = name;
        object.email = email;
        object.password = password;
        object.gender = gender;

        const user: any = await AppDataSource.manager.save(User, object).catch((e) => {

        })
        if (user.id) {

            return res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                gender: user.gender
            });
        }
        return res.json({ error: "Erro para salvar o usuario" });

    }
    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.body
        const user: any = await AppDataSource.manager.findOneBy(User, { id }).catch((e) => {
            return { error: "Identificador inválido" }
        })

        if (user && user.id) {
            const r = await AppDataSource.manager.remove(User, user).catch((e) => e.message)
            return res.json(r)
        }
        else if (user && user.error) {
            return res.json(user)
        }
        else {
            return res.json({ error: "User não localizado" })
        }


    }

} export default new UserController();
