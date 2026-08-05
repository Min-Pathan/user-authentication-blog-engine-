const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const error = new Error("Validation failed");

      error.name = "ValidationError";
      error.statusCode = 400;

      error.errors = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message,
      }));

      return next(error);
    }

    req.validatedData = result.data;

    return next();
  };
};

export default validate;