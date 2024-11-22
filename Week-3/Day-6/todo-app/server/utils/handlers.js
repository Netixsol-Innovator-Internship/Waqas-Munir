const responseHandler = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    message,
    data,
  });
};

const errorHandler = (res, statusCode, message, err) => {
  return res.status(statusCode).json({
    message,
    error: err,
  });
};

export { responseHandler, errorHandler };
