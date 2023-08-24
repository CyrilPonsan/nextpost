import { Request, Response } from "express";

import { badQuery, serverIssue } from "../../utils/data";
import { setToken } from "../../utils/auth.services/setToken";
import login from "../../models/auth/login";
import { Result, validationResult } from "express-validator";
import { logger } from "../../utils/logs/logger";

async function httpLogin(req: Request, res: Response) {
  try {
    const result: Result = validationResult(req);

    if (!result.isEmpty()) {
      throw { message: result.array()[0].msg, status: 400 };
    }
  } catch (error: any) {
    logger.error(error);
    return res
      .status(error.status ?? 500)
      .json({ message: error.message ?? badQuery });
  }
  console.log(req.body);

  const { username, password } = req.body;

  try {
    const user: any = await login(username, password);
    console.log(user);

    if (user) {
      const accessToken = setToken(user.id, user.role);
      const refreshToken = setToken(user.id, user.role);

      return res
        .cookie("accessToken", accessToken, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .cookie("refreshToken", refreshToken, {
          maxAge: 60 * 60,
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
