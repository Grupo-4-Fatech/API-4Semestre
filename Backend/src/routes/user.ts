import { Router } from "express";
import UserController from "../controllers/UserController";

const routes = Router();


routes.post("/create", UserController.createUser); 
routes.patch("/update", UserController.updateUser);
routes.delete("/delete", UserController.deleteUser);
routes.get("/list",UserController.listUser);
routes.get("/profile",UserController.profileUser);

export default routes;