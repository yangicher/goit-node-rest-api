import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema, updateSubscriptionSchema } from "../schemas/authSchemas.js";
import * as authController from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), authController.register);

authRouter.post("/login", validateBody(loginSchema), authController.login);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.get("/current", authenticate, authController.getCurrentUser);

authRouter.patch("/subscription", validateBody(updateSubscriptionSchema), authController.updateSubscription);

export default authRouter;
