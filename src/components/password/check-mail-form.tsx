"use client";

import React from "react";
import Field from "../forms/field";
import { SpinnerButton } from "../spinner-button";
import CustomError from "@/types/interfaces/custom-error";
import { useFormState } from "react-dom";
import { login } from "@/utils/actions/login";
import { checkEmail } from "@/utils/actions/check-email";
import { CheckCircle, Cross, XCircle } from "lucide-react";
import { Button } from "../ui/button";

const initialState: CustomError[] | number = [];

const CheckMailForm = ({ trad }: { trad: any }) => {
  const [state, formAction] = useFormState(checkEmail, initialState);

  const field = (
    <Field
      label="email"
      placeholder="ex: jean.dupont@exemple.fr"
      name="email"
      errors={Array.isArray(state) ? state : []}
    />
  );

  return (
    <div className="w-full 2xl:w-4/6 flex flex-col justify-center items-center">
      <form
        className="w-5/6 md:w-3/6 xl:w-3/12 2xl:w-3/12 flex flex-col items-center gap-y-8"
        action={formAction}
      >
        <div className="w-full flex justify-center my-4">
          <h1 className="text-2xl font-extrabold">{trad.page.title}</h1>
        </div>
        {state && Array.isArray(state) && state.length > 0 ? (
          <p className="w-full text-destructive text-xs font-bold mb-4">
            {state[0].message}
          </p>
        ) : null}

        {typeof state === "number" && state === 200 ? (
          <>
            <div className="w-full flex justify-center items-center gap-x-2">
              <p className="text-xs text-green-500 font-bold my-4">
                {trad.responses.email_verified}
              </p>

              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-center">{trad.page.text}</p>
          </>
        ) : null}
        {typeof state !== "number" || state !== 200 ? (
          <>
            <Field
              label={trad.page.email}
              placeholder="ex : jean.dupont@exemple.fr"
              name="email"
              errors={Array.isArray(state) ? state : []}
            />
            {typeof state === "number" && state === 400 ? (
              <>
                <div className="w-full flex justify-center items-center gap-x-2">
                  <p className="text-xs text-destructive font-bold">
                    {trad.errors.no_user}
                  </p>
                  <XCircle className="w-4 h-4 text-destructive" />
                </div>
              </>
            ) : null}
            <SpinnerButton name={trad.page.button} state={false} />
          </>
        ) : null}
      </form>
    </div>
  );
};

export default CheckMailForm;
