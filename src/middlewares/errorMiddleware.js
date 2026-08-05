const errorMiddleware = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error("Error:", error);

  // Validation error created by validateMiddleware
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.errors,
    });
  }

  // Multer file-size error
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "Uploaded file is too large",
    });
  }

  // Multer incorrect field name
  if (error.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      success: false,
      message: "Unexpected file field",
    });
  }

  // PostgreSQL unique constraint error
  if (error.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "The submitted value already exists",
    });
  }

  // PostgreSQL foreign-key error
  if (error.code === "23503") {
    return res.status(400).json({
      success: false,
      message: "Related database record does not exist",
    });
  }

  const statusCode = error.statusCode || 500;
console.error("ERROR:", error);
  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Internal server error"
        : error.message,
  });
};

export default errorMiddleware;