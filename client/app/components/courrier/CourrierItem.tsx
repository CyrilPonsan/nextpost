import type Courrier from "~/interfaces/courrier";

const CourrierItem = ({ courrier }: { courrier: Courrier }) => {
  return (
    <article className="w-full flex flex-col font-bold shadow-lg rounded-lg bg-secondary/10 border border-secondary/50 p-2 hover:border-secondary/80">
      <span className="w-full flex justify-between items-center text-xs">
        <p className="text-secondary">
          {new Date(courrier.date).toLocaleDateString()}
        </p>
      </span>
      <span className="w-full flex justify-between items-center mt-2">
        <p>n° {courrier.bordereau}</p>
        <p>{courrier.type}</p>
      </span>
      <span className="w-full flex justify-between items-center">
        <p className="capitalize">
          {courrier.civilite} {courrier.nom} {courrier.prenom}
        </p>
        <p>{courrier.etat}</p>
      </span>
    </article>
  );
};

export default CourrierItem;
