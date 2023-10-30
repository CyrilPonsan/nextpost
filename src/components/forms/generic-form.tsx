"use client";

import { FormEvent, ReactNode, useContext } from "react";
import { FormContext } from "./context/context-form";

interface GenericFormProps {
  children: ReactNode;
  onSubmit: (data: unknown) => void;
}

const GenericForm = (props: GenericFormProps) => {
  const { values } = useContext(FormContext);

  const handleSubmit = (event: FormEvent) => {
    console.log("submitted");

    event.preventDefault();
    props.onSubmit(values);
  };

  return <form className="w-full">{props.children}</form>;
};

export default GenericForm;
