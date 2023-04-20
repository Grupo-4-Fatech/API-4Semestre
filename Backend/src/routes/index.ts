import { Router, Request, Response } from "express";
import ticket from "./ticket";
import teams from "./teams";
import user from "./user";
import login from "./Login"
import InspectionGroup from "./InspectionGroup"
import group from "./group"


const routes = Router()

routes.use("/ticket", ticket);
routes.use("/user", user);
routes.use("/teams", teams);
routes.use('/Login', login);
routes.use('/InspectionGroup', InspectionGroup);
routes.use('/Group', group);


routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
