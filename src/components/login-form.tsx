"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";

import { SpinnerButton } from "./spinner-button";
import Field from "./forms/field";
import CustomError from "@/types/interfaces/custom-error";
import { login } from "@/utils/actions/login";

const initialState: CustomError[] = [];

const LoginForm = ({ trad, tradErrors }: { trad: any; tradErrors: any }) => {
  const [state, formAction] = useFormState(login, initialState);
  const { pending } = useFormStatus();

  return (
    <section className="w-full 2xl:w-4/6 min-h-[70vh] flex flex-col justify-center items-center">
      <form
        className="w-5/6 md:w-3/6 xl:w-3/12 2xl:w-3/12 flex flex-col items-center gap-y-4"
        action={formAction}
      >
        <div className="w-full flex justify-start my-4">
          <h1 className="text-2xl font-extrabold">{trad.title}</h1>
        </div>

        {state && state.length > 0 ? (
          <p className="w-full text-destructive text-xs font-bold mb-4">
            {tradErrors[state[0].message]}
          </p>
        ) : null}

        <Field
          label={trad.email}
          name="email"
          type="text"
          placeholder="ex : jean.dupont@exemple.fr"
          errors={Array.isArray(state) ? state : []}
        />

        <Field
          label={trad.password}
          name="password"
          type="password"
          errors={Array.isArray(state) ? state : []}
        />

        <Link className="text-xs underline" href="/password">
          {trad.link}
        </Link>

        <div className="w-full mt-4">
          <SpinnerButton state={pending} name={trad.button} />
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
