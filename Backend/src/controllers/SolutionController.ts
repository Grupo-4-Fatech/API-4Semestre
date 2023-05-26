import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Solution } from "../entities/Solution";
import { Ticket } from "../entities/Ticket";
import { User } from "../entities/Users";


class SolutionController{


  public async create(req: Request, res: Response): Promise<Response> {
    const {ticketSolution, problem, ticketId, solver } = req.body;

    const ticketTable = await AppDataSource.getRepository(Ticket);
    const ticket = await ticketTable.findOneBy({id: ticketId});

    const solution = await AppDataSource.getRepository(Solution).findOneBy({ticket: ticketId})

    if(solution != null){
      solution.problem = problem;
      solution.solution = ticketSolution;

      await AppDataSource.getRepository(Solution).save(solution)
      return res.json(solution);
    }

    const obj = new Solution();
    obj.solution = ticketSolution;
    obj.problem = problem;
    obj.ticket = ticket;
    obj.ticket.solver = solver;


    await AppDataSource.getRepository(Solution).save(obj).catch((e) => {
      return res.json({ error: "Erro ao salvar a Solução" });
  });

  return res.json(obj);
 
  }


  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const solution : any = await AppDataSource.manager.findOneBy(Solution, { id }).catch((e) => {
      return { error: "Identificador inválido" }
    })

    if (solution && solution.id) {
      const r = await AppDataSource.manager.remove(Solution, solution).catch((e) => e.message)
      return res.json(r)
    }
    
    return res.json({ error: "Solução não encontrada" })

  }


  async list(req: Request, res: Response): Promise<Response> {
    const response = await AppDataSource.getRepository(Solution).find();
    return res.json(response);
  }


} export default new SolutionController()
