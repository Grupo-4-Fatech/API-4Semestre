import { Router } from "express";
import UserController from "../controllers/UserController";

const routes = Router();


routes.post("/create", UserController.createUser); 
routes.patch("/update", UserController.updateUser);
routes.delete("/delete", UserController.deleteUser);
routes.get("/list",UserController.listUser);
routes.get("/getUsers", UserController.getUsers);
routes.get("/profile",UserController.profileUser);
routes.get("/get/:id", UserController.getUser)


export default routes;