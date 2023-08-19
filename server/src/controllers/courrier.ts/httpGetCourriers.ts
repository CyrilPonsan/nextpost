import { Response } from "express";

import getAllCourriers from "../../models/courrier/getAllCourriers";
import CustomRequest from "../../utils/interfaces/express/custom-request";
import { badQuery, noAccess, serverIssue } from "../../utils/data";
import { validationResult } from "express-validator";

async function httpGetCourriers(req: CustomRequest, res: Response) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ message: badQuery });
  }

  try {
    let id: any = req.auth!.userId;

    if (id) {
      id = parseInt(id);
    } else {
      return res.status(403).json({ message: noAccess });
    }
    console.log({ id });

    const { page, limit, type, direction, field } = req.query;

    const result = await getAllCourriers(
      id,
      +page!,
      +limit!,
      type! as string,
      field! as string,
      direction! as string
    );
    if (result && result.totalPages > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "Aucun courrier trouvé" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: serverIssue });
  }
}

export default httpGetCourriers;
