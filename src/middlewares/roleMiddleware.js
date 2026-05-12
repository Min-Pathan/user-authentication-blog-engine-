const roleMiddleWare = (req, res, next) => {
  try {
    const role = req.user.role;

    if (role === "user") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default roleMiddleWare;