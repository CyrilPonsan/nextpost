import type { FC } from "react";
import { Button } from "../@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  isLoading: boolean;
  type?: any;
};

const LoadinfButton: FC<Props> = ({ isLoading, type = "button" }) => {
  return (
    <>
      {isLoading ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connexion...
        </Button>
      ) : (
        <Button className="btn btn-secondary" type={type}>
          Se Connecter
        </Button>
      )}
    </>
  );
};

export default LoadinfButton;
