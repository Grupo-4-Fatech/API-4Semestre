import { Router } from "express";
import { TeamsController } from "../controllers";

const routes = Router();

routes.post("/createTeam", TeamsController.create)

export default routes;