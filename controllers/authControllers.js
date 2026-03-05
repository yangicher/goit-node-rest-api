import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

export const register = async (req, res) => {
  const user = await authServices.getUser({ where: { email: req.body.email } });
  if (user) {
    return res.status(409).json({
      message: "Email in use",
    });
  }
  try {
    const newUser = await authServices.registerUser(req.body);
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Помилка від Joi або іншої бібліотеки валідації",
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authServices.loginUser(email, password);
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await authServices.logoutUser(req.user);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  const { username, email, subscription, avatarURL } = req.user;
  res.json({ username, email, subscription, avatarURL });
};

export const updateSubscription = async (req, res, next) => {
  try {
    const updatedUser = await authServices.updateSubscription(
      req.user.id,
      req.body.subscription,
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res) => {
  const { id: owner } = req.user;
  const avatarURL = await authServices.updateAvatar(owner, req.file);
  return res.status(200).json({ avatarURL });
};
