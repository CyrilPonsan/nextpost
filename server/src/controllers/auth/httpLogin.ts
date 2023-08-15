import { Request, Response } from "express";
import login from "../../models/auth/login";
import { credentialsError, regexPassword, serverIssue } from "../../utils/data";

async function httpLogin(req: Request, res: Response) {
  console.log("hello", req.body);
  const { username, password } = req.body;
  if (!password || !regexPassword.test(password)) {
    return res.status(401).json({ message: credentialsError });
  }

  try {
    const user = await login(username, password);
    if (user) {
      req.session.userId = user.id;
      req.session.email = user.email;
      req.session.roles = user.roles;
      return res.status(200).json(user);
    }
    return res.status(401).json({ message: credentialsError });
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

export default httpLogin;
