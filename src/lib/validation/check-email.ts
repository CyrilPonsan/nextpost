/**
 * schéma pour valider la vérification d'email
 * lors d'une réinitialisation de mot de passe
 */

import { z } from "zod";

export const checkEmailFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "required_email" })
    .email({ message: "not_valid_email" }),
});
