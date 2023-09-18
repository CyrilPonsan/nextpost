import { Request, Response } from "express";

import { setToken } from "../../utils/auth.services/setToken";
import login from "../../models/auth/login";
import { Result, validationResult } from "express-validator";
import { logger } from "../../utils/logs/logger";
import { badRequest, serverIssue } from "../../lib/error-messages";
import { tokensMaxAge } from "../../lib/token-max-age";

async function httpLogin(req: Request, res: Response) {
  console.log(req.body);

  try {
    const result: Result = validationResult(req);

    if (!result.isEmpty()) {
      throw { message: result.array()[0].msg, status: 400 };
    }
  } catch (error: any) {
    logger.error(error);
    return res
      .status(error.status ?? 500)
      .json({ message: error.message ?? badRequest });
  }
  console.log(req.body);

  const { username, password } = req.body;

  try {
    const user: any = await login(username, password);
    console.log(user);

    if (user) {
      const accessToken = setToken(
        user.id,
        user.roles,
        tokensMaxAge.accessToken
      );
      const refreshToken = setToken(
        user.id,
        user.roles,
        tokensMaxAge.refreshToken
      );

      return res
        .cookie("accessToken", accessToken, {
          maxAge: tokensMaxAge.accessCookie,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .cookie("refreshToken", refreshToken, {
          maxAge: tokensMaxAge.refreshCookie,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json(user);
    }
  } catch (error: any) {
    let returnedError: any;
    if (error.status === 401) {
      returnedError = {
        ...error,
        from: req.socket.remoteAddress,
      };
    } else {
      returnedError = error;
    }

    logger.error(returnedError);
    return res
      .status(returnedError.status ?? 500)
      .json({ message: returnedError.message ?? serverIssue });
  }
}

export default httpLogin;
