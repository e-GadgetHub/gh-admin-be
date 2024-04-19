import { Request, Response } from "express";
import AdminService from "../services/AdminServ";

export default new (class AdminController {
    async register(req: Request, res: Response) {
        try {
            const response = await AdminService.register(req.body);

            res.status(200).json(response);
        } catch (error: any) {
            res.status(error.status).json(error.message);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const response = await AdminService.login(req.body);

            res.status(200).json(response);
        } catch (error: any) {
            res.status(error.status).json(error.message);
        }
    }
})();
