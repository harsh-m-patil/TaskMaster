import { IProject } from "./project";

export interface APIResponseProject {
  message: string;
  results?: number;
  data: {
    projects: IProject[];
  };
}
