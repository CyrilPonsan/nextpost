import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import CustomRequest from "../utils/interfaces/express/custom-request";
import { noAccess } from "../utils/data";

function checkToken(req: CustomRequest, res: Response, next: NextFunction) {
  const authCookie = req.cookies;
  console.log("cookie", authCookie);

  jwt.verify(authCookie, process.env.SESSION_SECRET!, (err: any, data: any) => {
    if (err) {
      return res.status(403).json({ message: noAccess });
    } else if (data && data.role === "expediteur") {
      // req.auth = { userId: data.userId, userRole: data.userRole };
      next();
    } else {
      return res.status(403).json({ message: "Get off my lawan !" });
    }
  });
}

export default checkToken;
