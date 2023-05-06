import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from "../entities/Users";
import * as jwt from "jsonwebtoken";


class LoginController {
    async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const user: any = await AppDataSource.manager.findOneBy(User, { email }).catch((e) => {
            return res.json({ error: "Email não encontrado" })
        })
        if (user) {
            if (user.password == password) {
                var userJwt = jwt.sign(email, process.env.JWT_SECRET)
                res.cookie("jwt", userJwt);
                return res.json(true);
            } else {
                return res.json({ error: "Senha incorreta" })
            }
        }else{
            return res.json({ error: "Email não encontrado" })
        }
    }

    async checkCookies(req: Request, res: Response): Promise<Response> {
        var value =  jwt.decode(req.cookies.jwt)
        var hasValue = value != "" &&  value != null ? true : false;
        return res.json(hasValue)
    }
    async logOut(req: Request, res: Response): Promise<Response> {

        res.cookie("jwt", null);
        return res.json(true);

    }
}
export default new LoginController();