import { ClerkService } from "../services/clerk.service.js";

export const getAllUsers = async (req, res) => {
  const [users, error] = await ClerkService.getUserLists();

  if (error) {
    res.status(500).json({
      message: error.message,
    });

    return;
  }

  res.status(200).json({
    message: "success",
    results: users.length,
    data: {
      projects: users,
    },
  });
};
