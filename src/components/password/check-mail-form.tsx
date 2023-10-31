"use client";

import React from "react";
import Field from "../forms/field";
import { SpinnerButton } from "../spinner-button";
import CustomError from "@/types/interfaces/custom-error";
import { useFormState } from "react-dom";
import { login } from "@/utils/actions/login";
import { checkEmail } from "@/utils/actions/check-email";

const initialState: CustomError[] | number = [];

const CheckMailForm = ({ trad }: { trad: any }) => {
  const [state, formAction] = useFormState(checkEmail, initialState);

  return (
    <div className="w-full 2xl:w-4/6 flex flex-col justify-center items-center">
      <form
        className="w-5/6 md:w-3/6 xl:w-3/12 2xl:w-3/12 flex flex-col items-center gap-y-4"
        action={formAction}
      >
        {state && Array.isArray(state) && state.length > 0 ? (
          <p className="w-full text-destructive text-xs font-bold mb-4">
            {state[0].message}
          </p>
        ) : null}

        <Field
          label="email"
          placeholder="ex: jean.dupont@exemple.fr"
          name="email"
          errors={Array.isArray(state) ? state : []}
        />
        <SpinnerButton name="Vérifier" state={false} />
      </form>
    </div>
  );
};

export default CheckMailForm;
