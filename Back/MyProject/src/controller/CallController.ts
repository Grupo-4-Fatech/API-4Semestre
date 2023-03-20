import AppDataSource from '../data-source'
import { NextFunction, Request, Response } from "express"
import {Call} from '../entity/Call'
import { IsUndefined } from '../utils/global';

class CallController {
    private callRepository = AppDataSource.getRepository("call")

    async all(req: Request, res: Response, next: NextFunction) {
        this.callRepository.find();
    }

    async status(req: Request, res: Response, next: NextFunction){
        const status = req.params.status

        const call = await this.callRepository.findOne({
            where: {status}
        })

        if(!call){
            return "Not Found"
        }

        return status;
    }

    async custom(req: Request, res:Response, where: string){
        const {type, title, description, status} = req.body;
        const call = await AppDataSource.getRepository(Call)
        .createQueryBuilder("call")
        if(!IsUndefined(type)){
            call.where("")
        }
    }

    async save(req: Request, res: Response, next: NextFunction){
        const {type, title, description, status} = req.body;

        const call = Object.assign(new Call(), {
            type,
            title,
            description,
            status,
        })

        if(!call){
            return "Invalid input"
        }

        return this.callRepository.save(call);
    }

    async remove(req: Request, res: Response, next: NextFunction){
        const id = req.body;
        const callToRemove = await AppDataSource.getRepository(Call)
        .findOneBy( {id: id,})
        await AppDataSource.getRepository(Call).remove(callToRemove)
    }
}

export default CallController;