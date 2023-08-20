import {
  defaultDirection,
  defaultLimit,
  defaultSortedField,
  routeCourrierFields,
} from "~/config/courriersSettings";
import { regexNumber } from "~/libs/regex";

function validatePage(page: string) {
  return regexNumber.test(page) ? page : "1";
}

function validateType(type: string) {
  return type !== "true" && type !== "false" ? "true" : type;
}

function validateLimit(limit: string) {
  return regexNumber.test(limit) ? limit : defaultLimit;
}

function validateField(field: string) {
  return routeCourrierFields.includes(field) ? field : defaultSortedField;
}

function validateDirection(direction: string) {
  return direction !== "ASC" && direction !== "DESC"
    ? defaultDirection
    : direction;
}

export function validateInput(input: any) {
  const { page, limit, type, field, direction } = input;
  return {
    page: validatePage(page),
    limit: validateLimit(limit),
    type: validateType(type),
    field: validateField(field),
    direction: validateDirection(direction),
  };
}
