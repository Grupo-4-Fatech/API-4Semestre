import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Solution } from "../entities/Solution";
import { Ticket } from "../entities/Ticket";
import { User } from "../entities/Users";


class SolutionController{


  public async create(req: Request, res: Response): Promise<Response> {

    const {description, problem, userId, ticketId } = req.body;

    const ticketTable = await AppDataSource.getRepository(Ticket);
    const ticket = await ticketTable.findOneBy({id: ticketId});

    const user = await AppDataSource.getRepository(User).findOneBy({id: userId});

    const obj = new Solution();
    obj.description = description;
    obj.problem = problem;
    obj.user = user;
    obj.ticket = [ticket];


    const solution: any = await AppDataSource.getRepository(Solution).save(obj).catch((e) => {

  });
  if (solution.id) {
    return res.json({

      description: solution.description,
      problem: solution.problem,
      user: solution.user,
      ticketId: solution.ticketId

    });
  }
  return res.json({ error: "Erro ao salvar a Solution" });
 
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
    
    return res.json({ error: "Solution não encontrado" })

  }
  async list(req: Request, res: Response): Promise<Response> {
    const response = await AppDataSource.getRepository(Solution).find();
    return res.json(response);
  }


    public async update(req: Request, res: Response): Promise<Response> {
    const { id, description, problem, user, ticketId  } = req.body;   

    const ticketTable = await AppDataSource.getRepository(Ticket);
    const ticket = await ticketTable.findOneBy({id: ticketId});

     const solution = AppDataSource.getRepository(Solution)

     const obj = await solution.findOneBy({
         id: id,
     })
   
     obj.description = description;
     obj.problem = problem;
     obj.user = user;
     obj.ticket = [ticket];

     await solution.save(obj)
     return res.json(obj)
     

  }


} export default new SolutionController()
