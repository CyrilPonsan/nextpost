import { Expediteur } from "../../db/models/expediteur";

async function getUserById(id: number) {
  const user = await Expediteur.findByPk(id);
  if (user) {
    return {
      email: user.email,
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      role: user.roles[0],
    };
  }
}

export default getUserById;
