import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from "../entities/Users";
import { Teams } from "../entities/Teams";
import e = require("express");
import { Ticket } from "../entities/Ticket";
import { Group } from "../entities/Group";

class TeamsController {


  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description, group, users } = req.body;
    const grouP = AppDataSource.getRepository(Group)
    const objG = await grouP.findOneBy({
      id: group,
    })
    const obj = new Teams();
    obj.name = name;
    obj.description = description;
    obj.group = objG;

    const teams: any = await AppDataSource.getRepository(Teams).save(obj).catch((e) => {

    });
    if (teams.id) {

      var response = await new TeamsController().insertUsers(teams.id, users)
      if (response) {
        return res.json("sucesso")
      }
    }
    return res.json({ error: "Erro ao salvar o Grupo" });


  }

  public async insertUsers(teamId, userId) {
    const userTable = await AppDataSource.getRepository(User);

    const team: Teams = await AppDataSource.getRepository(Teams).findOneBy({ id: teamId });

    const users: Array<User> = []

    userId.forEach(async (u) => {
      const user = await userTable.findOneBy({ id: u.value });
      users.push(user);
    });

    team.users = users;

    var result = await AppDataSource.getRepository(Teams).save(team);

    return result;
  }

  public async insertTickets(req: Request, res: Response): Promise<Response> {
    const { ticketId, teamName } = req.body;

    const ticketTable = await AppDataSource.getRepository(Ticket);
    const team: Teams = await AppDataSource.getRepository(Teams).findOneBy({ name: teamName });

    const tickets: Array<Ticket> = []

    ticketId.forEach(async (id) => {
      const ticket = await ticketTable.findOneBy({ id: id });
      tickets.push(ticket);
    });

    team.ticket = tickets;

    await AppDataSource.getRepository(Teams).save(team);

    return res.json(ticketId);
  }

  public async removeUser(req: Request, res: Response): Promise<Response> {
    const { teamName, userId } = req.body;

    const teams = await AppDataSource.getRepository(Teams);

    const userToRemove = await teams.findBy({ users: userId, name: teamName });

    teams.remove(userToRemove);

    return res.json(userToRemove);
  }

  public async getTeamsBy(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    const teamsTable = AppDataSource.getRepository(Teams);

    const team = teamsTable.findOneBy({ id: id });

    return res.json(team);
  }
  async list(req: Request, res: Response): Promise<Response> {
    const response: any = await AppDataSource.getRepository(Teams).find({
      order: {
        id: 'asc'
      }
    });
    return res.json(response);
  }
  async deleteTeam(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id)
    const teams = await AppDataSource.getRepository(Teams);

    const userToRemove = await teams.findBy({ id: id });

    teams.remove(userToRemove);

    return res.json(userToRemove);

  }
  async get(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id)
    const teamService = await AppDataSource.getRepository(Teams);

    const team = await teamService.find({
      where: { id: id }, relations: {
        users: true,
        group: true
      },
    });



    return res.json(team);

  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, description, group, users } = req.body;
    const grouP = AppDataSource.getRepository(Group)
    const objG = await grouP.findOneBy({
      id: group,
    })
    const userTable = await AppDataSource.getRepository(User);
    const teamService = await AppDataSource.getRepository(Teams);

    const team = await teamService.findOne({
      where: { id: id }, relations: {
        users: true,
        group: true
      },
    });

    if (team) {
      team.name = name;
      team.group = objG;
      team.description = description
      const userList: Array<User> = []

      users.forEach(async (u) => {
        const user = await userTable.findOneBy({ id: u.value });
        userList.push(user);
      });

      team.users = userList;

      var response = await teamService.save(team);
      if (response) {
        return res.json(true)
      } else {
        return res.json({ error: "Erro" })
      }
    }

    return res.json({ error: "Erro ao salvar o Grupo" });


  }

}
export default new TeamsController();