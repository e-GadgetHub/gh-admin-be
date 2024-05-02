import { Request, Response } from "express";
import AuthService from "../services/AuthServ";
import sendError from "../middlewares/errorHandler";

export default new (class AuthController {
  async register(req: Request, res: Response) {
    try {
      const response = await AuthService.register(req.body);

      res.status(200).json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const response = await AuthService.login(req.body);

      res.status(200).json(response);
    } catch (error) {
      sendError(res, error);
    }
  }
})();
