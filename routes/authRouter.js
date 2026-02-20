import { Router } from "express";
import authenticate from "../middlewares/auth.js";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema, updateSubscriptionSchema } from "../schemas/authSchemas.js";
import {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.post("/login", validateBody(loginSchema), login);

authRouter.post("/logout", authenticate, logout);

authRouter.get("/current", authenticate, getCurrentUser);

authRouter.patch("/subscription", validateBody(updateSubscriptionSchema), updateSubscription);

export default authRouter;
