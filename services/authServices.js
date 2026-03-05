import { createToken } from "../helpers/jwt.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import User from "../db/models/Users.js";
import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";

export const getUser = async (filter) => User.findOne(filter);

export const registerUser = async (payload) => {
  const avatarURL = gravatar.url(payload.email, { s: "250", d: "identicon" }, true);
  const passwordHash = await bcrypt.hash(payload.password, 10);
  return User.create({ ...payload, avatarURL: avatarURL, password: passwordHash });
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({
    where: { email: email },
  });
  if (!user) throw HttpError(401, "Email or password is wrong");
  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) throw HttpError(401, "Email or password is wrong");
  const token = await createToken({ id: user.id });
  await user.update({ token });
  return {
    token,
    user: { email: user.email, subscription: user.subscription, avatarURL: user.avatarURL },
  };
};

export const logoutUser = async (user) => {
  await user.update({ token: null });
};

export const updateSubscription = async (userId, subscription) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await user.update({ subscription });
  return user;
};

export const updateAvatar = async (owner, fileinfo) => {
  const avatarDir = path.join("public", "avatars");
  let avatarURL = null;
  if (fileinfo) {
    const newPath = path.join(avatarDir, fileinfo.filename);
    await fs.rename(fileinfo.path, newPath);
    avatarURL = path.join(avatarDir, fileinfo.filename);
  }

  const user = await getUser({ where: { id: owner } });
  await user.update({ avatarURL });
  return avatarURL;
};
