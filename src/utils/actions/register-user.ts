"use server";

import { loginFormSchema } from "@/lib/validation/login-form";
import { validationErrors } from "../validate";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function registerUser(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  try {
    loginFormSchema.parse(data);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return validationErrors(error);
    }
  }
  const response = await fetch("http://localhost:3000/api/register", {
    headers: { Content: "application/json" },
    method: "POST",
    body: JSON.stringify({ data }),
  });
  if (response.ok) {
    revalidatePath("/");
    throw redirect("/");
  } else {
    const error = await response.json();
    return [error];
  }
}
