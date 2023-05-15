import AppDataSource from "../data-source";
import { Log } from "../entities/Log";
import { User } from "../entities/Users";

import * as jwt from "jsonwebtoken";

class LogController {
    static async createLog(ticket: any, acao: string, req: any) {
        let email = jwt.decode(req.cookies.jwt);
        const user: any = await AppDataSource.getRepository(User).findOneBy({ email: email ? email.toString() : "" });
        var log = new Log();
        log.action = acao;
        log.date = new Date();
        log.tickets = ticket;
        log.users = user
        const newLog: any = await AppDataSource.manager.save(Log, log).catch((e) => { })
        return newLog;
    }

}

export default new LogController();