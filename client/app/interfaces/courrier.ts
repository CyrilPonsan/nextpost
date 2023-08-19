export default interface Courrier {
  id: number;
  type: number;
  bordereau: number;
  civilite?: string;
  prenom?: string;
  nom: string;
  etat: string;
  date: string;
  signature?: string;
}
