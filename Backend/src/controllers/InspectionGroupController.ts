import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { InspectionGroup } from "../entities/InspectionGroup";
import { User } from "../entities/Users";

class InspectionGroupController {


  public async create(req: Request, res: Response): Promise<Response> {

    const { grupoRisco, grupoImpacto, grupoCusto } = req.body;

    const userTable = await AppDataSource.getRepository(User);
    const userGrupoRisco: Array<User> = []
    const userGrupoImpacto: Array<User> = []
    const userGrupoCusto: Array<User> = []

    for(const u of grupoCusto.users) {
      const user = await AppDataSource.manager.findOneBy(User,{ id: u.value });
      userGrupoCusto.push(user);
    };
    for( const u of grupoImpacto.users){
      const user = await AppDataSource.manager.findOneBy(User,{ id: u.value });
      userGrupoImpacto.push(user);
    };
    for(const u of grupoRisco.users){
      const user = await AppDataSource.manager.findOneBy(User,{ id: u.value });
      userGrupoRisco.push(user);
    };


    const obj0 = new InspectionGroup();
    obj0.name = grupoCusto.name;
    obj0.descricao = grupoCusto.descricao;
    obj0.ticket = null
    obj0.users = userGrupoCusto;
    const obj1 = new InspectionGroup();
    obj1.name = grupoRisco.name;
    obj1.descricao = grupoRisco.descricao;
    obj1.ticket = null;
    obj1.users = userGrupoRisco;
    const obj2 = new InspectionGroup();
    obj2.name = grupoImpacto.name;
    obj2.descricao = grupoImpacto.descricao;
    obj2.ticket = null
    obj2.users = userGrupoImpacto;
    const grupoInpercaoList: Array<InspectionGroup> = [obj0, obj1, obj2]

    for( const el of grupoInpercaoList){
      const inspectionGroup: any = await AppDataSource.getRepository(InspectionGroup).save(el).catch((e) => {

      });
      if (inspectionGroup.id) {
        console.log("Sucesso")
      } else {
        return res.json({ error: "Erro ao salvar grupo grupo." });
        break;
      }

    }
    // var n = 0
    // while (n < 3) {
    //   const inspectionGroup: any = await AppDataSource.getRepository(InspectionGroup).save(obj+n).catch((e) => {

    //   });
    //   if (inspectionGroup.id) {
    //   } else {
    //     return res.json({ error: "Erro ao salvar grupo grupo." })
    //   }

    // }

    return res.json({ obj0, obj1, obj2 });


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
      return res.json({ error: "grupo não encontrado" })
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
    const { id, name, descricao, userId } = req.body;


    const userTable = await AppDataSource.getRepository(User);

    const user = await userTable.findOneBy({ id: userId });

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





