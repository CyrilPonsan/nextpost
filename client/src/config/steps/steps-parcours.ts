import { addIdToObject } from "../../utils/add-id-to-objects";

const steps = [
  {
    label: "Informations",
  },
  {
    label: "Compétences",
  },
  {
    label: "Modules",
  },
  {
    label: "Objectifs",
  },
  {
    label: "Calendrier",
  },
  {
    label: "Etudiants",
  },
  {
    label: "",
  },
];

export const stepsParcours = addIdToObject(steps).map((item: any) => ({
  ...item,
  saved: false,
  isValid: false,
}));
