import { Router } from "express";
import { LoginController} from "../controllers";
const routes = Router();

routes.post("/Login", LoginController.login) 
routes.get("/CheckCookies", LoginController.checkCookies)
routes.get("/LogOut", LoginController.logOut)


export default routes;