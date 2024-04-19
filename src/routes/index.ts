import { Router } from "express";
import AdminController from "../controllers/AdminCont";

const routes = Router();

routes.post("/admin/register", AdminController.register);
routes.post("/admin/login", AdminController.login);

export default routes;
