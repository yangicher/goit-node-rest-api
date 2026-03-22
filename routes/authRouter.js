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
  updateAvatar,
  verifyUser,
  sentUserEmail
} from "../controllers/authControllers.js";
import upload from "./../middlewares/upload.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.post("/login", validateBody(loginSchema), login);

authRouter.post("/logout", authenticate, logout);

authRouter.get("/current", authenticate, getCurrentUser);

authRouter.patch("/subscription", authenticate, validateBody(updateSubscriptionSchema), updateSubscription);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

authRouter.get("/verify/:verificationToken", verifyUser);

authRouter.post("/verify", sentUserEmail);

export default authRouter;
