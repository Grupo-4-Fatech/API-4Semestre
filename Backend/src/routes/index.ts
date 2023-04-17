import { Router, Request, Response } from "express";
import ticket from "./ticket";
import teams from "./teams";
import user from "./user";
import login from "./Login"
import Group from "./Group"


const routes = Router()

routes.use("/ticket", ticket);
routes.use("/user", user);
routes.use("/teams", teams);
routes.use('/Login', login);
routes.use('/Group', Group);


routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
