import { z } from "zod";
import { regexPassword } from "../regex";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide." }),
  password: z.string().regex(regexPassword, {
    message:
      "Le mot de passe doit avoir au minimum huit caractères, un chiffre, une minuscule, une majuscule et un caractère spécial.",
  }),
});
