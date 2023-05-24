import { Router } from "express";
import { TicketController } from "../controllers";

const routes = Router();

routes.get("/bar", TicketController.ticketcount)
//routes.get("/pie", ) --> grafico de pizza aqui

export default routes;