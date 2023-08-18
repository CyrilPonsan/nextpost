import { Request, Response } from "express";

import { credentialsError, regexPassword, serverIssue } from "../../utils/data";
import { setToken } from "../../utils/auth.services/setToken";
import login from "../../models/auth/login";

async function httpLogin(req: Request, res: Response) {
  const { username, password } = req.body;
  if (!password || !regexPassword.test(password)) {
    return res.status(401).json({ message: credentialsError });
  }
  console.log({ username, password });

  try {
    const user: any = await login(username, password);
    console.log("user", user);

    if (user) {
      const accessToken = setToken(user.id, user.role);
      const refreshToken = setToken(user.id, user.role);

      return res
        .cookie("accessToken", accessToken, {
          maxAge: 60 * 60,
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
    return res.status(401).json({ message: credentialsError });
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

export default httpLogin;
