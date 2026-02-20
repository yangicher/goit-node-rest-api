import { createToken } from "../helpers/jwt.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import User from "../db/models/Users.js";

export const getUser = async filter => User.findOne(filter);

export const registerUser = async (payload) => {
  const passwordHash = await bcrypt.hash(payload.password, 10);
  return User.create({ ...payload, password: passwordHash });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user.id,
  };
  const token = createToken(payload);
  await user.update({ token });
  return {user, token};
};

export const logoutUser = user => {
    user.update({ token: null });
};

export const updateSubscription = async (userId, subscription) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw HttpError(404, "User not found");
    }
    await user.update({ subscription });
    return user;
}