import sequelize from "sequelize";

import { Courrier } from "../../db/models/courrier";
import { Statut } from "../../db/models/statut";
import { StatutCourrier } from "../../db/models/statutCourrier";
import { getOffset, getTotalPages } from "../../helpers/pagination";

async function getAllCourriers(
  id: number,
  page: number,
  limit: number,
  type: string,
  field: string,
  direction: string
) {
  const condition = type === "true" ? "< 5" : "> 4";

  const statuts = await Statut.findAll();

  const response = await Courrier.findAll({
    where: { expediteur_id: id },
    include: [
      {
        model: StatutCourrier,
        as: "statutCourrier",
        attributes: [],
        include: [{ model: Statut, as: "statut", attributes: ["statutCode"] }],
      },
    ],

    attributes: [
      "id",
      "bordereau",
      "type",
      "nom",
      "prenom",
      "civilite",
      [sequelize.fn("MAX", sequelize.col("statutCode")), "etat"],
      [sequelize.fn("MAX", sequelize.col("statutCourrier.date")), "date"],
    ],
    group: ["statutCourrier.courrier_id"],
    having: sequelize.literal(`MAX(statutCode) ${condition}`),
    order: [[field, direction]],
  });

  const courriers = response.map((courrier: any) => {
    const item = statuts.find(
      (statut) => statut.dataValues.statutCode === courrier.dataValues.etat
    );
    return { ...courrier.dataValues, etat: item!.dataValues.etat };
  });

  const result = Array<any>();

  const offset = getOffset(page, limit);

  let max: number;
  if (offset + limit <= courriers.length) {
    max = offset + limit;
  } else {
    max = courriers.length;
  }

  for (let i = offset; i < max; i++) {
    result.push(courriers[i]);
  }

  return {
    courriers: result,
    totalPages: getTotalPages(courriers.length, limit),
  };
}

export default getAllCourriers;
