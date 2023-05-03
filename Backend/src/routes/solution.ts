import { Router } from "express";
import { SolutionController} from "../controllers";
const routes = Router();

routes.post("/create", SolutionController.create)
routes.delete("/delete", SolutionController.delete)
routes.get("/list", SolutionController.list)
routes.patch("/update", SolutionController.update);


export default routes;