import * as bcrypt from "bcrypt";
import { Expediteur } from "../../db/models/expediteur";
import { credentialsError } from "../../utils/data";

async function login(email: string, password: string) {
  try {
    const user = await Expediteur.findOne({
      where: { email: email },
      raw: true,
    });
    if (user) {
      const passwordIsValid = await bcrypt.compare(password, user.password);
      const isAllowed = user.roles[0] === "expediteur";

      const isValid = passwordIsValid && isAllowed;

      if (isValid) {
        return {
          isValid,
          email: user.email,
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          role: user.roles[0],
        };
      }
    }
    throw { message: credentialsError, status: 401 };
  } catch (error: any) {
    throw error;
  }
}

export default login;
