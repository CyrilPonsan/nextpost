import { NextFunction, Request, Response } from "express";

function isLogged(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("totoSession:", req.session);
    if (req.session.userId !== null) {
      next();
    } else {
      return res.status(403).json({ error: "Get off my lawn!" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

export default isLogged;
