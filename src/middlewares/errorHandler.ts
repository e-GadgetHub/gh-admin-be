import { Response } from "express";
import ResponseError from "../error/responseError";

export default function sendError(res: Response, err: ResponseError) {
  res.status(err.status || 500).json(err.message || "Internal Server Error");
}
