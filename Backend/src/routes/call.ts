import { Router } from "express";
import { CallController } from "../controllers";



const routes = Router();


routes.post("/create", CallController.create); 
routes.patch("/update", CallController.update);
routes.delete("/delete", CallController.delete);
routes.get("/list",CallController.list);
routes.get("/status", CallController.status);



export default routes;