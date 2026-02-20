import * as authServices from "../services/authServices.js";

import User from "../db/models/Users.js";
import HttpError from "../helpers/HttpError.js";

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) throw HttpError(409, "Email in use");
    const newUser = await User.create(req.body);
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
    const token = await authServices.loginUser(req.body.email, req.body.password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
    await authServices.logoutUser(req.user.id);
    res.status(204).send();
};

export const getCurrentUser = async (req, res, next) => {
    const {username, email, subscription} = req.user;
    res.json({username, email, subscription});
}

export const updateSubscription = async (req, res, next) => {
  try {
    const updatedUser = await authServices.updateSubscription(req.user.id, req.body.subscription);
    res.json(updatedUser); 
  } catch (error) {
    next(error);
  }
};  