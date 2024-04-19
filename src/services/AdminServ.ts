import { Request } from "express";
import Admin from "../model/admin";
import { AdminSchema } from "../utils/validator/admin";
import { validate } from "../utils/validator/validation";
import ResponseError from "../error/responseError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default new (class AdminService {
    async register(data: Request) {
        try {
            const valid = validate(AdminSchema, data);
            const isExist = await Admin.countDocuments({ username: valid.username });

            if (isExist != 0) throw new ResponseError(400, "Username already exist");
            const hash = await bcrypt.hash(valid.password, 10);

            await Admin.create({
                username: valid.username,
                password: hash,
            });

            return {
                message: "Register success",
            };
        } catch (error) {
            throw error;
        }
    }

    async login(data: Request) {
        try {
            const valid = validate(AdminSchema, data);
            const admin = await Admin.findOne({ username: valid.username });

            if (!admin) throw new ResponseError(400, "Username not found");
            const isEqual = await bcrypt.compare(valid.password, admin.password);

            if (!isEqual) throw new ResponseError(400, "Wrong password");
            const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.SECRET_KEY, {
                expiresIn: "1d",
            });

            return {
                message: "Login success",
                token,
            };
        } catch (error) {
            throw error;
        }
    }
})();
