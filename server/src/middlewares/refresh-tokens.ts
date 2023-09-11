import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import CustomRequest from "../utils/interfaces/express/custom-request";
import { noAccess } from "../lib/error-messages";
import { setToken } from "../utils/auth.services/setToken";
import { tokensMaxAge } from "../lib/token-max-age";

function refreshTokens(req: CustomRequest, res: Response, next: NextFunction) {
  const authCookie = req.cookies.refreshToken;

  jwt.verify(authCookie, process.env.SESSION_SECRET!, (err: any, data: any) => {
    //console.log(err);

    if (err) {
      return res.status(403).json({ message: noAccess });
    } else {
      const accessToken = setToken(
        data.userId,
        data.userRoles,
        tokensMaxAge.accessToken
      );
      const refreshToken = setToken(
        data.userId,
        data.userRoles,
        tokensMaxAge.refreshToken
      );
      return res
        .cookie("accessToken", accessToken, {
          maxAge: tokensMaxAge.accessCookie,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true : false,
        })
        .cookie("refreshToken", refreshToken, {
          maxAge: tokensMaxAge.refreshCookie,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true : false,
        })
        .status(200)
        .json({ message: "tokens refreshed successfully!" });
    }
  });
}

export default refreshTokens;
