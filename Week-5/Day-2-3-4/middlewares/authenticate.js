import { errorHandler } from "../utils/handlers.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (!header) return errorHandler(res, 401, "Unauthenticated");
    const token = header.split(" ")[1];
    const id = verifyToken(token);
    if (!id) return errorHandler(res, 401, "Unauthenticated");
    req.userId = id;
    next();
  } catch (error) {
    console.error(error);
    errorHandler(res, 500, error.message);
  }
};
