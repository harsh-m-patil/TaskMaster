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
  deadline: {
    type: Date,
    required: true,
  },
  assignedTo: String,
  status: {
    type: String,
    default: "UnAssigned",
    enum: ["Assigned", "In Progress", "Completed", "UnAssigned"],
  },
});

export const Project = model("Project", projectSchema);
