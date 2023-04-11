import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from "../entities/Users";


class UserController {
    async list(req: Request, res: Response): Promise<Response> {
        const response: any = await AppDataSource.getRepository(User).find({
        });
        return res.json(response);
    }
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, name, email, password } = req.body;
        const userRepository = AppDataSource.getRepository(User)
        const userToUpdate = await userRepository.findOneBy({
            id: id,
        })
        userToUpdate.name = name;
        userToUpdate.email = email;
        userToUpdate.password = password;

        await userRepository.save(userToUpdate)
        return res.json(userToUpdate)
    }
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const obj = new User();
        obj.name = name;
        obj.email = email;
        obj.password = password;

        const user: any = await AppDataSource.manager.save(User, obj).catch((e) => {

        })
        if (user.id) {

            return res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            });
        }
        return res.json({ error: "Erro para salvar o usuario" });

    }
    public async delete(req: Request, res: Response): Promise<Response> {
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
