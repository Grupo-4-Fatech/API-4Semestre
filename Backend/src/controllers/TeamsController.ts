import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from "../entities/Users";
import { Teams } from "../entities/Teams";
import e = require("express");

class TeamsController{
    
    
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    
      const obj = new Teams();
          obj.name = name;

      await AppDataSource.getRepository(Teams).save(obj).catch((e) => res.json(e));
      
    return res.json(obj);
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

      const teams = await AppDataSource.getRepository(Teams);

      const userToRemove = await teams.findBy({users: userId, name: teamName});

      teams.remove(userToRemove);

      return res.json(userToRemove);
  }

  public async getTeamsBy(){
  }

}
export default new TeamsController();