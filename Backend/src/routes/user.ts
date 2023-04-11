import { Router } from "express";
import UserController from "../controllers/UserController";

const routes = Router();


routes.post("/create", UserController.create); 
routes.patch("/update", UserController.update);
routes.delete("/delete", UserController.delete);
routes.get("/list",UserController.list);


export default routes;