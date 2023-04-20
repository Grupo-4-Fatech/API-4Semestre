import { Router } from "express";
import { InspectionGroupController} from "../controllers";
const routes = Router();

routes.post("/create", InspectionGroupController.create)
routes.delete("/delete", InspectionGroupController.delete)
routes.get("/list", InspectionGroupController.list)
routes.patch("/update", InspectionGroupController.update);


export default routes;