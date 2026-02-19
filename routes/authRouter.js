import { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema, updateSubscriptionSchema } from "../schemas/authSchemas.js";
import * as authController from "../controllers/authControllers.js";

const contactsRouter = Router();

contactsRouter.post("/register", validateBody(registerSchema), authController.register);

contactsRouter.post("/login", validateBody(loginSchema), authController.login);

contactsRouter.post("/logout", authController.logout);

contactsRouter.get("/current", authController.getCurrentUser);

contactsRouter.patch("/subscription", validateBody(updateSubscriptionSchema), authController.updateSubscription);

export default contactsRouter;
