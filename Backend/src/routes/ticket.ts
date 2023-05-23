import { Router } from "express";
import { TicketController } from "../controllers";




const routes = Router();

routes.get("/get/:id", TicketController.one)
routes.post("/create", TicketController.create); 
routes.patch("/update", TicketController.update);
routes.delete("/delete", TicketController.delete);
routes.get("/list",TicketController.list);
routes.get("/status", TicketController.status);
routes.get("/getAll/:status", TicketController.getAll)
routes.patch("/updateStatus", TicketController.updateStatus)
routes.get("/getKanbanItem", TicketController.getKanbanItem)
routes.post("/deleteAll", TicketController.deleteAll)
routes.get("/getLog/:id", TicketController.getLogs)
routes.patch("/avaliar", TicketController.avaliar)

export default routes;