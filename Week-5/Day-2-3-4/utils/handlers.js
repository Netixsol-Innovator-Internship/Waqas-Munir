const responseHandler = (res, status, message, data) => {
  return res.status(status).json({ message, data });
};

const errorHandler = (res, status, message = "Internal Server Error") => {
  return res.status(status).json({ message });
};

export { responseHandler, errorHandler };
