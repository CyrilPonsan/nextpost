import type Courrier from "~/interfaces/courrier";

const CourrierItem = ({ courrier }: { courrier: Courrier }) => {
  return (
    <article className="w-full flex flex-col gap-y-2">
      <span className="w-full flex justify-between items-center">
        <p>{new Date(courrier.date).toLocaleDateString()}</p>
        <p>{courrier.etat}</p>
      </span>
    </article>
  );
};

export default CourrierItem;
