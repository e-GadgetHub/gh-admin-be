import Joi from "joi";

export const AuthSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
  role: Joi.string().max(5).optional(),
});
