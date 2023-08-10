import { Request, Response } from "express";
import { Expediteur } from "../../db/models/expediteur";
import { noAccess, serverIssue } from "../../utils/data";

async function httpHandshake(req: Request, res: Response) {
  if (req.session.userId !== null) {
    try {
      const user = await Expediteur.findOne({
        where: { email: req.session.email },
      });
      if (user) {
        return res.status(200).json({
          email: user.email,
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          roles: user.roles,
        });
      }
      return res.status(403).json({ message: noAccess });
    } catch (err) {
      return res.status(500).json({ message: serverIssue + err });
    }
  }
}

export default httpHandshake;
