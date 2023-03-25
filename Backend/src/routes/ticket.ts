import { Router } from "express";
import { TicketController } from "../controllers";



const routes = Router();

routes.get("/get/:id", TicketController.one)
routes.post("/create", TicketController.create); 
routes.patch("/update", TicketController.update);
routes.delete("/delete", TicketController.delete);
routes.get("/list",TicketController.list);
routes.get("/status", TicketController.status);



export default routes;