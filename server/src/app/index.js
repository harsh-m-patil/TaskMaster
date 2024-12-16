import express from "express";
import cors from "cors";
import morgan from "morgan";
import { clerkMiddleware } from "@clerk/express";
import { projectRouter } from "./routes/projects.route.js";
import { userRouter } from "./routes/user.route.js";

export function initServer() {
  const app = express();
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(clerkMiddleware());
  app.use("/api/v1/projects", projectRouter);
  app.use("/api/v1/users", userRouter);

  app.use("*", (req, res, next) => {
    res.status(404).json({
      message: "Route not Found",
    });
  });

  return app;
}
