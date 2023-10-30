"use client";

import { ZodError } from "zod";
import { signIn } from "next-auth/react";

import { loginFormSchema } from "@/lib/validation/login-form";
import { validationErrors } from "../validate";

export async function login(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  try {
    loginFormSchema.parse(data);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return validationErrors(error);
    }
  }

  const res = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
    callbackUrl: "/dashboard",
  });
  if (!res?.ok) {
    const error = {
      type: "identifiants",
      message: "Email ou mot de passe incorrect",
    };
    return [error];
  } else {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  }
}
