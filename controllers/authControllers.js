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
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (user) throw HttpError(409, "Email in use");

    const newUser = await authServices.registerUser(req.body);
    const verificationEmail = {
      to: email,
      subject: "Verify your email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${newUser.verificationToken}">Click to verify your email</a>`,
    };
    await sendEmail(verificationEmail);

    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
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

export const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;
  await service.verifyUser(verificationToken);
  res.json({ message: "Verification successful" });
};

export const sentUserEmail = async (req, res) => {
  const { email } = req.body;
  await service.sentUserEmail(email);
  res.json({ message: "Verification email sent" });
};