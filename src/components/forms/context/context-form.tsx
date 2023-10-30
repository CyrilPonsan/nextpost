"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";

interface FormContextType {
  values: Record<string, string>;
  errors: any[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  onValidationErrors: (data: any) => void;
  onHasBeenSubmitted: (value: boolean) => void;
  onChangeValue: (field: string, value: string) => void;
}

export const FormContext = createContext<FormContextType>({
  values: {},
  errors: [{}],
  isLoading: false,
  setIsLoading: (value: boolean) => {},
  onValidationErrors: (data: any) => {},
  onHasBeenSubmitted: (value: boolean) => {},
  onChangeValue: (field: string, value: string) => {},
});

export default function FormContextProvider(props: { children: ReactNode }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  const onChangeValue = (field: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const onValidationErrors = (data: any) => {
    setErrors(data);
  };

  const onHasBeenSubmitted = (value: boolean) => {
    setHasBeenSubmitted(value);
  };

  useEffect(() => {
    if (hasBeenSubmitted) {
      setErrors([]);
    }
  }, [hasBeenSubmitted, values]);

  const contextValue: FormContextType = {
    values,
    errors,
    isLoading,
    setIsLoading,
    onValidationErrors,
    onHasBeenSubmitted,
    onChangeValue,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {props.children}
    </FormContext.Provider>
  );
}
