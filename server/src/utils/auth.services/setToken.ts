import jwt from "jsonwebtoken";

export function setToken(userId: string, userRoles: string[], age: string) {
  return jwt.sign({ userId, userRoles }, process.env.SESSION_SECRET!, {
    expiresIn: age,
  });
}
