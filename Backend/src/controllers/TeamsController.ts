import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Ticket } from "../entities/Ticket";
import { IsUndefined } from "../utils/global";
import { User } from "../entities/Users";
import { Teams } from "../entities/Teams";
import e = require("express");

class TeamsController{
    
    
  public async create(req: Request, res: Response): Promise<Response> {
    const { userId, name } = req.body;

    const userTable = await AppDataSource.getRepository(User);

    const user = await userTable.findOneBy({id: userId});

      const obj = new Teams();
          obj.name = name;
          obj.users = [user];

      await AppDataSource.getRepository(Teams).save(obj).catch((e) => res.json(e));
      
    return res.json(userId);
  }

  public async insert(req: Request, res: Response): Promise<Response> {
    const { teamName, userId } = req.body;

    const userTable = await AppDataSource.getRepository(User);
    const team: Teams = await AppDataSource.getRepository(Teams).findOneBy({name: teamName});


    const users: Array<User> = [] 
    
    userId.forEach(async (id) => {
      const user = await userTable.findOneBy({id: id});
      users.push(user);
    });

    team.users = users;

    await AppDataSource.getRepository(Teams).save(team);

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