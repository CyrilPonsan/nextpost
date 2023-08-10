import jwt from "jsonwebtoken";

export function setToken(userId: string, userRole: string) {
  console.log(process.env.SECRET);

  return jwt.sign({ userId, userRole }, process.env.SECRET!);
}
