import "dotenv/config";

import app from "./app.js";
import pool from "./config/db.js";

const port = Number(process.env.PORT || 5000);

const startServer = async () => {
  try {
    await pool.query("SELECT 1");

    console.log("Database connected");

    const server = app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });

    server.on("error", (error) => {
      console.error("Server failed to start:", error.message);
      process.exit(1);
    });

    let isShuttingDown = false;

    const shutdown = () => {
      if (isShuttingDown) return;
      isShuttingDown = true;

      console.log("Shutting down server...");

      const timeout = setTimeout(() => {
        console.error("Shutdown timed out");
        process.exit(1);
      }, 10000);

      timeout.unref();

      server.close(async () => {
        try {
          await pool.end();
          clearTimeout(timeout);
          process.exit(0);
        } catch (error) {
          console.error("Shutdown failed:", error.message);
          process.exit(1);
        }
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    await pool.end();
    process.exit(1);
  }
};

startServer();