import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Ticket } from "../entities/Ticket";
import { IsUndefined } from "../utils/global";
import { User } from "../entities/Users";
import { Teams } from "../entities/Teams";

class TeamsController{
    
    
  public async create(req: Request, res: Response): Promise<Response> {
    const { userId, name } = req.body;

    userId.forEach(async id => {
        const user = await AppDataSource.getRepository(User).findBy({id: id})

        const obj = new Teams();
            obj.name = name;
            obj.users = user

            await AppDataSource.manager.save(obj)
    });

    return res.json(userId);

  }


}
export default new TeamsController();