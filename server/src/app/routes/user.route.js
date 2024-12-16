import { Router } from "express";
import { getPostedProjects } from "../controllers/projects.controller.js";

const userRouter = Router();

userRouter.route("/:id/projects/posts").get(getPostedProjects);

export { userRouter };
