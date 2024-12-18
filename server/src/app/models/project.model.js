import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  createdBy: {
    type: String,
    required: true,
  },
  createByUserName: {
    type: String,
    default: "user",
  },
  deadline: {
    type: Date,
    required: true,
  },
  assignedTo: String,
  assignedToUserName: String,
  totalTasks: {
    type: Number,
    default: 10,
  },
  completedTasks: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "UnAssigned",
    enum: ["Assigned", "In Progress", "Completed", "UnAssigned"],
  },
});

export const Project = model("Project", projectSchema);
