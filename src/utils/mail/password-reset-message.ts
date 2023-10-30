export function passwordResetMsg(token: string) {
  let msg = `<p>Bonjour,<br>Vous avez demandé une réinitialisation de votre mot de passe, pour cela veuillez cliquer sur le lien ci-dessous :</p><a href="${process.env.URL_CLIENT}/reinitialiser-password?token=${token}">Réinitialiser le mot de passe</a>`;
  /*
  msg += "<p><strong>STEP </strong>Post<br>";
  msg += "Technopôle Hélioparc <br>";
  msg += "CS 8011<br>";
  msg += "2 avenue du Président Pierre Angot <br>";
  msg += "64053 Pau Cedex<br>";
  msg += "Tél: 05 59 14 78 79<br>";
  msg += "www.step.eco</p>";
  msg += `<p style="font-size: 10px">Ce mail n'affiche volontairement aucun logo et n'a pas vocation à être imprimé #ecoresponsable</p>`;
  */
  return msg;
}
