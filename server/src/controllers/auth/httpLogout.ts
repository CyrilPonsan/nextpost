import { Request, Response } from "express";

async function httpLogout(req: Request, res: Response) {
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json({ message: "Déconnecté(e)." });
}

export default httpLogout;
