import { Router, Request, Response } from "express";
import ticket from "./ticket";
import user from "./user";


const routes = Router()

routes.use("/ticket", ticket);
routes.use("/user", user);


routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
