import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  return jwt.sign(payload, "secretKey", { expiresIn: "1h" });
};

const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, "secretKey");
    return decode.id;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
