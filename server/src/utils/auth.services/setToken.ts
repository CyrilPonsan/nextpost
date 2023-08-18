import jwt from "jsonwebtoken";

export function setToken(userId: string, userRole: string) {
  console.log(process.env.SESSION_SECRET);

  return jwt.sign({ userId, userRole }, process.env.SESSION_SECRET!);
}
