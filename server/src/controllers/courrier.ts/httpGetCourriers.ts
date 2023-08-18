import { Response } from "express";

import getAllCourriers from "../../models/courrier/gatAllCourriers";
import CustomRequest from "../../utils/interfaces/express/custom-request";

async function httpGetCourriers(req: CustomRequest, res: Response) {
  let id: any = req.auth!.userId;
  console.log({ id });

  if (id) {
    id = parseInt(id);
    console.log("id", id);

    const result = await getAllCourriers(id);
    return res.status(200).json(result);
  }
}

export default httpGetCourriers;
