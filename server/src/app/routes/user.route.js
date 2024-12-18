import { Router } from "express";
import { getPostedProjects } from "../controllers/projects.controller.js";
import { getAllUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.route("/:id/projects/posts").get(getPostedProjects);

export { userRouter };
