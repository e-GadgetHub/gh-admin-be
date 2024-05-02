import { Request } from "express";
import { AuthSchema } from "../utils/validator/auth";
import { validate } from "../utils/validator/validation";
import ResponseError from "../error/responseError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma";

export default new (class AuthService {
  async register(data: Request) {
    try {
      const valid = validate(AuthSchema, data);
      const isExist = await prisma.user.count({ where: { email: valid.email } });

      if (isExist != 0) throw new ResponseError(400, "Email already exist");
      const hash = await bcrypt.hash(valid.password, 10);

      const user = await prisma.user.create({
        data: {
          email: valid.email,
          password: hash,
        },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });

      if (user.role === "user") {
        const profile = await prisma.profile.create({
          data: {
            userId: user.id,
          },
        });

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            profile: { connect: { id: profile.id } },
          },
        });
      }

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      return {
        message: "Register success",
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(data: Request) {
    try {
      const valid = validate(AuthSchema, data);
      const user = await prisma.user.findFirst({ where: { email: valid.email } });

      if (!user) throw new ResponseError(400, "Email not registered yet");
      const isEqual = await bcrypt.compare(valid.password, user.password);

      if (!isEqual) throw new ResponseError(400, "Email/Password is incorrect");
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.SECRET_KEY, {
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
