import sequelize from "sequelize";
import { Courrier } from "../../db/models/courrier";
import { Statut } from "../../db/models/statut";
import { StatutCourrier } from "../../db/models/statutCourrier";
import { getOffset } from "../../helpers/pagination";

async function getAllCourriers(
  id: number,
  page: number,
  limit: number,
  type: string,
  field: string,
  direction: string
) {
  const condition = type === "true" ? "< 5" : "> 4";

  console.log("welcome");

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

  console.log(response);

  const result = Array<any>();

  const offset = getOffset(page, limit);

  for (let i = offset; i < offset + limit; i++) {
    result.push(courriers[i]);
  }

  return result;
}

export default getAllCourriers;
