"use server";

import { checkEmailFormSchema } from "@/lib/validation/check-email";
import { ZodError } from "zod";
import { validationErrors } from "../validate";

export async function checkEmail(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  console.log({ data });

  try {
    checkEmailFormSchema.parse(data);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return validationErrors(error);
    }
  }

  const response = await fetch(`${process.env.BASE_API}/password/checkemail`, {
    method: "POST",
    body: JSON.stringify({ data }),
  });
  if (response.ok) {
    console.log(await response.json());

    return 200;
  } else {
    if (response.status === 400) {
      return 400;
    }
    const error = await response.json();
    return [error];
  }
}
