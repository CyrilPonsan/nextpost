import type Courrier from "~/interfaces/courrier";
import { getCourrierType } from "~/libs/getCourrierType";

const CourrierItem = ({ courrier }: { courrier: Courrier }) => {
  return (
    <article className="w-full flex flex-col font-bold shadow-lg rounded-lg bg-secondary/10 border border-border hover:border-ring p-4 hover:scale-[1.02] hover:duration-200 duration-200 text-primary">
      <span className="w-full flex justify-between items-center text-xs text-muted-foreground">
        <p>{new Date(courrier.date).toLocaleDateString()}</p>
        <p className="capitalize">{getCourrierType(courrier.type)}</p>
      </span>
      <span className="w-full flex justify-between items-center">
        <p className="text-xs">Réf : {courrier.bordereau}</p>
      </span>
      <span className="w-full flex justify-between items-center mt-2">
        <p className="capitalize">
          {courrier.civilite} {courrier.nom} {courrier.prenom}
        </p>
        <p>{courrier.etat}</p>
      </span>
    </article>
  );
};

export default CourrierItem;
