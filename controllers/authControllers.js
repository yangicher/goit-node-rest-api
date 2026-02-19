import authsRouter from "../routes/authRouter.js";
import * as authServices from "../services/authServices.js";

import Users from "../db/models/Users.js";
import { HttpError } from "../helpers/index.js";

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (user) throw HttpError(409, "Email in use");
    const newUser = await Users.create(req.body);
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    authServices.loginUser(req.body.email, req.body.password);
    // Implement login logic here
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
    await authServices.logoutUser(req.user.id);
    res.status(204).send();
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await authServices.getUser(req.user.id);
    res.json(user); 
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const updatedUser = await authServices.updateSubscription(req.user.id, req.body.subscription);
    res.json(updatedUser); 
  } catch (error) {
    next(error);
  }
};  