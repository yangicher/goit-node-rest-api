import HttpError from "../helpers/HttpError.js";
import { getUser } from "../services/authServices.js";
import { verifyToken } from "./../helpers/jwt.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw HttpError(401, "Not authorized");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw HttpError(401, "Not authorized");
  }

  const { data, error } = verifyToken(token);
  if (error) {
    throw HttpError(401, error.message);
  }

  const user = await getUser({ id: data.id });

  if (!user || !user.token) {
    throw HttpError(401, "Not authorized");
  }

  req.user = user;
  next();
};

export default authenticate;
