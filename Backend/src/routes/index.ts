import { Router, Request, Response } from "express";
import ticket from "./ticket";


const routes = Router()

routes.use("/ticket", ticket);


routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
