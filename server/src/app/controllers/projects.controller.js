import { ProjectService } from "../services/projects.servive.js";

export const getAllProjects = async (req, res) => {
  const [projects, error] = await ProjectService.getAllProjects();

  if (error) {
    res.status(500).json({
      message: error.message,
    });

    return;
  }

  res.status(200).json({
    message: "success",
    results: projects.length,
    data: {
      projects,
    },
  });
};

export const getProject = async (req, res) => {
  const [project, error] = await ProjectService.getProject(req.params.id);

  if (error) {
    res.status(500).json({
      message: error.message,
    });

    return;
  }

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
};

// NOTE: Functions below this require Auth
export const getPostedProjects = async (req, res) => {
  const [projects, error] = await ProjectService.getPostedProjects(
    req.auth.userId,
  );

  if (error) {
    res.status(500).json({
      message: error.message,
    });

    return;
  }

  res.status(200).json({
    message: "success",
    results: projects.length,
    data: {
      projects,
    },
  });
};

export const getAssignedProjects = async (req, res) => {
  const [projects, error] = await ProjectService.getUsersProjects(
    req.auth.userId,
  );

  if (error) {
    res.status(500).json({
      message: error.message,
    });

    return;
  }

  res.status(200).json({
    message: "success",
    results: projects.length,
    data: {
      projects,
    },
  });
};

export const assignProject = async (req, res) => {
  const [project, error] = await ProjectService.assignProject(
    req.params.id,
    req.body.userId,
  );

  if (error) {
    res.status(500).json({
      message: error.message,
    });

    return;
  }

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
};

export const createProject = async (req, res) => {
  req.body.createdBy = req.auth.userId;
  req.body.createdByUserName = req.auth.username;
  const [project, error] = await ProjectService.createProject(req.body);

  if (error) {
    res.status(500).json({
      message: error.message,
    });

    return;
  }

  res.status(201).json({
    message: "success",
    data: {
      project,
    },
  });
};
