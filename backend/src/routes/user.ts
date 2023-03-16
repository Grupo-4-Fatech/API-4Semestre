import { Router } from "express";
// import {Data} from "../controllers";
import { UserController } from "../controllers";
const routes = Router();


routes.post("/create", UserController.create);
routes.delete("/delete", UserController.delete);
routes.get("/list",UserController.list)

export default routes;