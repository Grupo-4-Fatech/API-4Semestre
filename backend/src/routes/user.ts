import { Router } from "express";
// import {Data} from "../controllers";
import { UserController } from "../controllers";
const routes = Router();


routes.post("/create", UserController.create);
// routes.get('/day', Data.dia);
// routes.get('/month', Data.mes);
// routes.get('/year', Data.ano);
routes.delete("/delete", UserController.delete);

export default routes;