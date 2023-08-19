import { regexMail, regexPassword } from "~/libs/regex";

function isValidEmail(value: string) {
  return value && regexMail.test(value.trim());
}

function isValidPassword(value: string) {
  return value && regexPassword.test(value.trim());
}

export function validateCredentials(input: {
  username: string;
  password: string;
}) {
  let validationErrors: any = {};

  if (!isValidEmail(input.username)) {
    validationErrors.email = "Invalid email address.";
  }

  if (!isValidPassword(input.password)) {
    validationErrors.password =
      "Invalid password. Must be at least 7 characters long.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}
