import { Response, NextFunction } from "express";

import CustomRequest from "../utils/interfaces/express/custom-request";
import { serverIssue } from "../utils/data";

function checkToken(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    console.log("session:", req.session);
    if (req.session.userId !== null) {
      next();
    } else {
      return res.status(403).json({ error: "Get off my lawn!" });
    }
  } catch (err) {
    res.status(500).json({ message: serverIssue + err });
  }
}

export default checkToken;
