import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Ticket } from "../entities/Ticket";
import { IsUndefined } from "../utils/global";
import { User } from "../entities/Users";
import { Teams } from "../entities/Teams";

class TeamsController{
    
    
  public async create(req: Request, res: Response): Promise<Response> {
    const { userId, name } = req.body;

    userId.forEach(async(id) => {
        const user = await AppDataSource.getRepository(User).findOneBy({id: id})

        const obj = new Teams();
            obj.name = name;
            obj.users = user;

        await AppDataSource.manager.save(obj)
    });
    return res.json(userId);
  }

  public async insert(req: Request, res: Response): Promise<Response> {
    const { teamName, userId} = req.body;

    const team = await AppDataSource.getRepository(Teams).findOneBy({name: teamName});

    userId.forEach(async(id)=> {
      const obj = new Teams()
      obj.users = id
      await AppDataSource.manager.save(obj);
      
    })
    return res.json(userId);
  }

  public async removeUser(req: Request, res: Response): Promise<Response>{
    const { teamName, userId } = req.body;

    const userToRemove = await AppDataSource.getRepository(Teams).findBy({users: userId});

    const team = await AppDataSource.getRepository(Teams).findBy({name: teamName})

    return res.json(userToRemove);
  }

}
export default new TeamsController();