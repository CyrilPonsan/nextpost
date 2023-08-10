import { Courrier } from "../../db/models/courrier";

async function getAllCourriers(id: number) {
  console.log({ id });

  const response = await Courrier.findAll({
    where: { expediteur_id: id },
  });
  return response;
}

export default getAllCourriers;
