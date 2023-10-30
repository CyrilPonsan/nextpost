import { z } from "zod";
import { regexPassword } from "../regex";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Une adresse email est requise." })
    .email({ message: "Adresse email invalide." }),
  password: z
    .string()
    .min(1, { message: "Un mot de passe est requis." })
    .regex(regexPassword, {
      message:
        "Le mot de passe doit avoir au minimum huit caractères, un chiffre, une minuscule, une majuscule et un caractère spécial.",
    }),
});
