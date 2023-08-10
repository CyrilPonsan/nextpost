import { Request } from "express";
import { IRole } from "../db/role";

export default interface CustomRequest extends Request {
  auth?: {
    userId: string;
    userRoles: Array<IRole>;
  };
}
