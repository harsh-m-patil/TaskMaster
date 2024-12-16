import { requireAuth } from "@clerk/express";
import { Router } from "express";
import {
  assignProject,
  createProject,
  getAllProjects,
  getProject,
} from "../controllers/projects.controller.js";

const projectRouter = Router();

projectRouter.route("/").get(getAllProjects);
projectRouter.route("/:id").get(getProject);

projectRouter.use(requireAuth());
projectRouter.route("/:id").post(assignProject);
projectRouter.route("/").post(createProject);

export { projectRouter };
