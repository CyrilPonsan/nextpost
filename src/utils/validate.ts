import { ZodError } from "zod";

import CustomError from "@/types/interfaces/custom-error";

export function validateForm(schema: any, data: unknown) {
  try {
    schema.parse(data);
  } catch (error: any) {
    if (error instanceof ZodError) {
      let validationErrors = Array<CustomError>();
      for (const item of error.issues) {
        const customError: CustomError = {
          type: item.path[0] as string,
          message: item.message,
        };
        validationErrors = [...validationErrors, customError];
      }
      return validationErrors;
    }
  }
}

export function validationErrors(error: any) {
  let validationErrors = Array<CustomError>();
  for (const item of error.issues) {
    const customError: CustomError = {
      type: item.path[0] as string,
      message: item.message,
    };
    validationErrors = [...validationErrors, customError];
  }
  console.log({ validationErrors });

  return validationErrors;
}
