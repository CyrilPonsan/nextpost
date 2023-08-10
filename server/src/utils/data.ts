//  quelques constantes utilisées un peu partout dans l'api

export const serverIssue = `Problème serveur, réessayez plus tard.`;
export const credentialsError = "Identifiants incorrects.";
export const noData = "Ressource inexistante.";
export const badQuery = "Paramètres de requête non conformes.";
export const noAccess = "Accès réservé.";
export const regexMail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#\$%\^&\*])(?=.{8,})/;
export const regexFacteurPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/;
export const regexNumber = /^[0-9]*$/;
export const regexGeneric = /^[a-zA-Z0-9\s,.':\-+éàèâô_°êûù]{0,}$/;

export const _setRandomNumber = (min: number, max: number) => {
  return Math.trunc(Math.random() * (max - min + 1) + min);
};
