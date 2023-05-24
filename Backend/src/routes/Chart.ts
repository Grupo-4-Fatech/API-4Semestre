import { Router } from "express";
import { TicketController } from "../controllers";

const routes = Router();

routes.get("/bar", TicketController.ticketcount)
routes.get("/pie", TicketController.ticketperStatus)


export default routes;