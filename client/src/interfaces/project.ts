export interface IProject {
  _id?: string;
  title: string;
  description?: string;
  createdBy: string;
  createdByUserName?: string;
  deadline: Date;
  assignedTo?: string;
  assignedToUserName?: string;
  status?: string;
  totalTasks?: number;
  completedTasks?: number;
}
