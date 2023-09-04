export function getCourrierType(value: number) {
  switch (value) {
    case 0:
      return "colis";
    case 1:
      return "lettre recommandée";
    default:
      return "lettre recommandée - AR";
  }
}
