import { Op } from "sequelize";

import { Courrier } from "../../db/models/courrier";
import { StatutCourrier } from "../../db/models/statutCourrier";
import { Statut } from "../../db/models/statut";

async function getDetailsCourrierDetails(userId: number, courrierId: number) {
  try {
    const courrier = await Courrier.findOne({
      where: {
        [Op.and]: [{ id: courrierId }, { expediteur_id: userId }],
      },
      include: [
        {
          model: StatutCourrier,
          as: "statutCourrier",
          attributes: [],
          include: [
            {
              model: Statut,
              as: "statut",
              attributes: ["statutCode", "label"],
            },
          ],
        },
      ],
      order: [[{ model: StatutCourrier, as: "statutCourrier" }, "date", "ASC"]],
    });

    if (!courrier) {
      throw { message: "Le courrier n'existe pas", status: 404 };
    }
    return courrier;
  } catch (error: any) {
    throw error;
  }
}

export default getDetailsCourrierDetails;
