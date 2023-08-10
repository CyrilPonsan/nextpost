import { Request, Response } from "express";
import getAllCourriers from "../../models/courrier/gatAllCourriers";

async function httpGetCourriers(req: Request, res: Response) {
  console.log(req.session);

  let id: any = req.session.userId;
  if (id) {
    id = parseInt(id);
    console.log("id", id);

    const result = await getAllCourriers(id);
    return res.status(200).json(result);
  }
}

export default httpGetCourriers;
