import { Router } from "express";
import { GroupController} from "../controllers";
const routes = Router();

routes.post("/create", GroupController.create)
routes.delete("/delete", GroupController.delete)
routes.get("/list", GroupController.list)
routes.patch("/update", GroupController.update);
routes.get("/get/:id", GroupController.get)


export default routes;