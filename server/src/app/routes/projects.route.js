import { requireAuth } from "@clerk/express";
import { Router } from "express";
import {
  assignProject,
  createProject,
  getAllProjects,
  getAssignedProjects,
  getPostedProjects,
  getProject,
} from "../controllers/projects.controller.js";

const projectRouter = Router();

projectRouter.route("/").get(getAllProjects);
projectRouter.route("/:id").get(getProject);
projectRouter.route("/:id").post(assignProject);

projectRouter.use(requireAuth());
projectRouter.route("/me/posted").get(getPostedProjects);
projectRouter.route("/me/assigned").get(getAssignedProjects);
projectRouter.route("/").post(createProject);

export { projectRouter };
