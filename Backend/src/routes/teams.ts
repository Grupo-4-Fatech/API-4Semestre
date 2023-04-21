import { Router } from "express";
import { TeamsController } from "../controllers";

const routes = Router();

routes.post("/create", TeamsController.create)
routes.post("/insert", TeamsController.insertUsers)
routes.delete("/removeUser", TeamsController.removeUser)
routes.get("/list", TeamsController.list)
routes.delete("/delete/:id", TeamsController.deleteTeam)
routes.get("/get/:id", TeamsController.get)
routes.patch("/update", TeamsController.update)

export default routes;