import jwt from "jsonwebtoken";

export function setToken(userId: string, userRoles: string[]) {
  return jwt.sign({ userId, userRoles }, process.env.SESSION_SECRET!);
}
