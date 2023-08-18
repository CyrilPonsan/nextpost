import { Request, Response } from "express";

async function httpLogout(req: Request, res: Response) {
  //req.session.destroy((err: any) => console.log(err));
  return res.status(200).json({ message: "Déconnecté!" });
}

export default httpLogout;
