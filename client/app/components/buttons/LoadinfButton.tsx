import type { FC } from "react";

type Props = {
  isLoading: boolean;
  type?: any;
};

const LoadinfButton: FC<Props> = ({ isLoading, type = "button" }) => {
  return (
    <>
      {isLoading ? (
        <button className="btn btn-primary">
          <span className="loading loading-spinner text-white bg-primary"></span>
          Connexion...
        </button>
      ) : (
        <button className="btn btn-primary" type={type}>
          Se Connecter
        </button>
      )}
    </>
  );
};

export default LoadinfButton;
