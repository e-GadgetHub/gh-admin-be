import { Router } from "express";
import AdminController from "../controllers/AdminCont";

const routes = Router();

routes.post("/register", AdminController.register);
routes.post("/login", AdminController.login);

export default routes;
