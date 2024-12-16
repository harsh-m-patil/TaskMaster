import { Project } from "../models/project.model.js";
import { ClerkService } from "./clerk.service.js";

export class ProjectService {
  /**
   * @description get All projects
   */
  static async getAllProjects() {
    try {
      const projects = await Project.find();
      return [projects, null];
    } catch (error) {
      return [[], error];
    }
  }

  /**
   * @description get a projects
   */
  static async getProject(projectId) {
    try {
      const project = await Project.findById(projectId);
      return [project, null];
    } catch (error) {
      return [null, error];
    }
  }
  /**
   * @description Create a new Project
   */
  static async createProject(project) {
    try {
      const createdProject = await Project.create(project);
      return [createdProject, null];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * @description Assign a project to user
   */
  static async assignProject(projectId, userId) {
    try {
      // Check if the given user exists
      const user = await ClerkService.getUser(userId);
      if (!user) return [null, new Error("User doesn't exist")];

      const project = await Project.findById(projectId);

      if (!project) return [null, new Error("Project not found")];

      if (project.status === "Assigned")
        return [null, new Error("Project Already assigned")];

      project.status = "Assigned";
      project.assignedTo = userId;

      await project.save();

      return [project, null];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * @description Get projects posted by an user
   */
  static async getPostedProjects(userId) {
    try {
      // Check if the given user exists
      const user = await ClerkService.getUser(userId);
      if (!user) return [null, new Error("User doesn't exist")];

      const projects = await Project.find({ createdBy: userId });

      return [projects, null];
    } catch (error) {
      return [[], error];
    }
  }

  /**
   * @description Get projects assigned to an user
   */
  static async getUsersProjects(userId) {
    try {
      // Check if the given user exists
      const user = await ClerkService.getUser(userId);
      if (!user) return [null, new Error("User doesn't exist")];

      const projects = await Project.find({ assignedTo: userId });
      return [projects, null];
    } catch (error) {
      return [[], error];
    }
  }
}
