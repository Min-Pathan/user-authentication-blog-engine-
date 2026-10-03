import "dotenv/config";
import express from "express";
import cors from "cors";
import logger from "./middlewares/logger.js";
import path from "path"

import userRoutes from "./routes/userRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import contactRoutes from "./routes/contactRoutes.js";
import commentRoutes from "./routes/commentRoutes.js"
import likeRoutes from "./routes/likeRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js"
import helmet from "helmet";
import apiLimiter from "./middlewares/rateLimitMiddleware.js";
import hpp from "hpp";

// Comma-separated list of browser origins allowed to call the API,
// e.g. CORS_ORIGIN=http://localhost:5173,http://localhost:5174
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  throw new Error(
    "CORS_ORIGIN is missing or empty, please add it to your .env file",
  );
}

const app = express();

app.use(cors({
  origin: allowedOrigins,
  credentials:true,
  methods:[
     "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
  ]
}))
app.use(helmet())
app.use(hpp())
app.use(apiLimiter)
app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(logger)


app.get("/", (req, res)=>{
    res.status(200).json({
        msg:"blogger api is running"
    })
})

app.use("/api/users", userRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/contact", contactRoutes);
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/uploads", uploadRoutes);
app.use("/uploads", express.static(path.resolve("uploads")))
app.use("/api/categories", categoryRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware)

export default app;