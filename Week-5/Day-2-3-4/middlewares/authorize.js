import { User } from "../models/user.js";
import { errorHandler } from "../utils/handlers.js";

const authorize = async (req, res, next) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId);
    if (!user) return errorHandler(res, 404, "User not found");

    if (!user.isAdmin) return errorHandler(res, 403, "Unauthorized");

    next();
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, error.response);
  }
};

export { authorize };
