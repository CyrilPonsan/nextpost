import { z } from "zod";
import { regexPassword } from "../regex";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "required_email" })
    .email({ message: "not_valid_email" }),
  password: z
    .string()
    .min(1, { message: "password_required" })
    .regex(regexPassword, { message: "not_valid_password" }),
});
