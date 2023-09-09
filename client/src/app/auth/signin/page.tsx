"use client";

import EmailInput from "@/components/formulaires/email-input";
import PasswordInput from "@/components/formulaires/password-input";
import SubmitButton from "@/components/formulaires/submit-button";
import { loginFormSchema } from "@/lib/validation/login-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { z, ZodError } from "zod";

interface CustomError {
  type: string;
  message: string;
}

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState<CustomError>({ type: "", message: "" });
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError({ type: "", message: "" });
    try {
      setLoading(true);

      const validatedData = loginFormSchema.parse({
        email: emailValue,
        password: passwordValue,
      });

      console.log({ validatedData });

      const res = await signIn("credentials", {
        redirect: false,
        email: emailValue,
        password: passwordValue,
        callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        router.push("/client");
      } else {
        setError({ type: "form", message: "Email ou mot de passe incorrect" });
      }
    } catch (error: any) {
      setLoading(false);

      if (error instanceof ZodError) {
        setError({
          type: error.issues[0].path[0] as string,
          message: error.issues[0].message,
        });
      }
    }
  };

  return (
    <section className="w-full min-h-[95vh] flex justify-center items-center">
      <form
        className="w-5/6 md:w-3/6 xl:w-3/12 2xl:w-3/12 flex flex-col gap-y-4"
        onSubmit={onSubmit}
      >
        <h1 className="text-2xl font-extrabold">Connexion</h1>

        <div className="divider" />

        {error.message.length > 0 ? (
          <>
            <div className="flex justify-center">
              <p className="text-error text-xs font-bold">{error.message}</p>
            </div>
            <div className="divider" />
          </>
        ) : null}

        <EmailInput
          email={emailValue}
          onChange={setEmailValue}
          validationError={error.type === "email"}
        />

        <PasswordInput
          password={passwordValue}
          onChange={setPasswordValue}
          validationError={error.type === "password"}
        />

        <Link className="text-xs text-center hover:underline" href="#">
          {"Besoin d'aide ?"}
        </Link>
        <div className="divider" />
        <SubmitButton
          isLoading={loading}
          label="Se Connecter"
          loadingLabel="Connexion en cours..."
        />
      </form>
    </section>
  );
}
