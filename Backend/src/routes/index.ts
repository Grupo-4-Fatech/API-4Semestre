import { Router, Request, Response } from "express";
import ticket from "./ticket";
import teams from "./teams";
import user from "./user";
import login from "./Login"
import InspectionGroup from "./InspectionGroup"
import group from "./Group"
import solution from "./solution"
import log from './Log'
import chart from './Chart'

const routes = Router()

routes.use("/ticket", ticket);
routes.use("/user", user);
routes.use("/teams", teams);
routes.use('/Login', login);
routes.use('/InspectionGroup', InspectionGroup);
routes.use('/group', group);
routes.use('/solution', solution)
routes.use('/Log', log);
routes.use('/chart', chart)


routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
