import { Request } from "express";

export default interface CustomRequest extends Request {
  auth?: {
    userId: number;
    userRole: string;
  };
}
