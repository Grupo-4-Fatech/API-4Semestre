import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Group } from "../entities/Group";


class GroupController {


  public async create(req: Request, res: Response): Promise<Response> {
    const { name, descricao } = req.body;

    const obj = new Group();
    obj.name = name;
    obj.descricao = descricao;


    const group: any = await AppDataSource.getRepository(Group).save(obj).catch((e) => {

    });
    if (group.id) {

      return res.json({
        name: group.name,
        descricao: group.descricao
      });
    }
    return res.json({ error: "Error while saving the Group" });


  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const group: any = await AppDataSource.manager.findOneBy(Group, { id }).catch((e) => {
      return { error: "Invalid identifier" }
    })

    if (group && group.id) {
      const r = await AppDataSource.manager.remove(Group, group).catch((e) => e.message)
      return res.json(r)
    }
    else if (group && group.error) {
      return res.json(group)
    }
    else {
      return res.json({ error: "group not found" })
    }


  }
  async list(req: Request, res: Response): Promise<Response> {
    const response: any = await AppDataSource.getRepository(Group).find({
      order: {
        id: 'asc'
      }
    });
    return res.json(response);
  }


  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, descricao } = req.body;

    const group = AppDataSource.getRepository(Group)

    const obj = await group.findOneBy({
      id: id,
    })

    obj.name = name;
    obj.descricao = descricao;


    await group.save(obj)
    return res.json(obj)

  }
  public async get(req: Request, res: Response): Promise<Response> {
    const id  = parseInt(req.params.id);
    console.log(id)
    const group = AppDataSource.getRepository(Group)

    const obj = await group.findOneBy({
      id: id,
    })
    return res.json(obj)
  }


} export default new GroupController()
