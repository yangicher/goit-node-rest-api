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
  updateAvatar
} from "../controllers/authControllers.js";
import upload from "./../middlewares/upload.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.post("/login", validateBody(loginSchema), login);

authRouter.post("/logout", authenticate, logout);

authRouter.get("/current", authenticate, getCurrentUser);

authRouter.patch("/subscription", authenticate, validateBody(updateSubscriptionSchema), updateSubscription);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

export default authRouter;
