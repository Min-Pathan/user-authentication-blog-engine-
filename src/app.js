import "dotenv/config";
import express from "express";
import cors from "cors";
import logger from "./middlewares/logger.js";
import pool from "./config/db.js";

import userRoutes from "./routes/userRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"

const app = express();

app.use(cors())
app.use(express.json())
app.use(logger)

app.get("/", (req, res)=>{
    res.status(200).json({
        msg:"blogger api is running"
    })
})

app.use("/api/users", userRoutes)
app.use("/api/blogs", blogRoutes)

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("Database connected");
    console.log(res.rows);
  }
});

const port = process.env.PORT
app.listen(port, ()=>{
     console.log(`Server running on port ${port}`);
})