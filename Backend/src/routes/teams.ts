import { Router } from "express";
import { TeamsController } from "../controllers";

const routes = Router();

routes.post("/createTeam", TeamsController.create)
routes.post("/insert", TeamsController.insert)
routes.delete("/removeUser", TeamsController.removeUser)

export default routes;