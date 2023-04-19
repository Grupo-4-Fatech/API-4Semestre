import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from "../entities/Users";
import { Teams } from "../entities/Teams";
import e = require("express");
import { Ticket } from "../entities/Ticket";

class TeamsController{
    
    
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description, group } = req.body;
    
      const obj = new Teams();
          obj.name = name;
          obj.description = description;
          obj.group = group;

      await AppDataSource.getRepository(Teams).save(obj).catch((e) => res.json(e));
      
    return res.json(obj);
  }

  public async insertUsers(req: Request, res: Response): Promise<Response> {
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

  public async insertTickets(req: Request, res: Response): Promise<Response> {
    const { ticketId, teamName } = req.body;

    const ticketTable = await AppDataSource.getRepository(Ticket);
    const team: Teams = await AppDataSource.getRepository(Teams).findOneBy({name: teamName});

    const tickets: Array<Ticket> = [] 
    
    ticketId.forEach(async (id) => {
      const ticket = await ticketTable.findOneBy({id: id});
      tickets.push(ticket);
    });

    team.ticket = tickets;

    await AppDataSource.getRepository(Teams).save(team);

      return res.json(ticketId);
  }

  public async removeUser(req: Request, res: Response): Promise<Response>{
      const { teamName, userId } = req.body;

      const teams = await AppDataSource.getRepository(Teams);

      const userToRemove = await teams.findBy({users: userId, name: teamName});

      teams.remove(userToRemove);

      return res.json(userToRemove);
  }

  public async getTeamsBy(req: Request, res: Response): Promise<Response>{
    const { name } = req.body;

    const teamsTable = AppDataSource.getRepository(Teams);

    const team = teamsTable.findOneBy({name: name});

      return res.json(team);
  }

}
export default new TeamsController();