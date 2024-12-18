import { IUser } from "./user";

export interface APIResponseUser {
  message: string;
  results?: number;
  data: {
    users: IUser[];
  };
}
