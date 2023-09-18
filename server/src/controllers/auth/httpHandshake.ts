import { Response } from "express";

import CustomRequest from "../../utils/interfaces/express/custom-request";
import getUserById from "../../models/user/getUserById";
import { noAccess, serverIssue } from "../../lib/error-messages";

async function httpHandshake(req: CustomRequest, res: Response) {
  if (req.auth && req.auth.userId !== null) {
    try {
      const user = await getUserById(req.auth.userId);

      if (user && user.role[0] === "expediteur") {
        return res.status(200).json({
          id: user.id,
          email: user.email,
          role: user.role,
        });
      }
      return res.status(403).json({ message: noAccess });
    } catch (err) {
      return res.status(500).json({ message: serverIssue + err });
    }
  }
}

export default httpHandshake;
