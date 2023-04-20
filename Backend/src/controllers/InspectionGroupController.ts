import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { InspectionGroup } from "../entities/InspectionGroup";
import { User } from "../entities/Users";

class InspectionGroupController {


  public async create(req: Request, res: Response): Promise<Response> {

    const {name, descricao, userId } = req.body;

    const userTable = await AppDataSource.getRepository(User);

    const user = await userTable.findOneBy({id: userId});


    const obj = new InspectionGroup();
    obj.name = name;
    obj.descricao = descricao;
    obj.users = [user];


    const inspectionGroup: any = await AppDataSource.getRepository(InspectionGroup).save(obj).catch((e) => {

  });
  if (inspectionGroup.id) {
    return res.json({

      name: inspectionGroup.name,
      descricao: inspectionGroup.descricao,
      userId: inspectionGroup.userId

    });
  }
  return res.json({ error: "Error while saving the Group" });
 

  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const inspectionGroup : any = await AppDataSource.manager.findOneBy(InspectionGroup, { id }).catch((e) => {
      return { error: "Invalid identifier" }
    })

    if (inspectionGroup && inspectionGroup.id) {
      const r = await AppDataSource.manager.remove(InspectionGroup, inspectionGroup).catch((e) => e.message)
      return res.json(r)
    }
    else if (inspectionGroup && inspectionGroup.error) {
      return res.json(inspectionGroup)
    }
    else {
      return res.json({ error: "group not found" })
    }


  }
  async list(req: Request, res: Response): Promise<Response> {
    const response: any = await AppDataSource.getRepository(InspectionGroup).find({
      order: {
        id: 'asc'
      }
    });
    return res.json(response);
  }


    public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, descricao,userId  } = req.body;   

    
    const userTable = await AppDataSource.getRepository(User);

    const user = await userTable.findOneBy({id: userId});

     const inspectionGroup = AppDataSource.getRepository(InspectionGroup)

     const obj = await inspectionGroup.findOneBy({
         id: id,
     })
   
     obj.name = name;
     obj.descricao = descricao;
     obj.users = [user];
     
     await inspectionGroup.save(obj)
     return res.json(obj)
     

  }


} export default new InspectionGroupController()





