import { Link } from "@remix-run/react";
import { Button } from "../@/components/ui/button";

import Logo from "./Logo";
import { ModeToggle } from "../ModeToggle";

const AuthHeaders = () => {
  return (
    <header className="w-full h-[5vh] flex justify-between items-center pr-4 bg-background">
      <Logo />
      <span className="flex items-center gap-x-2">
        <Button size="sm" asChild>
          <Link to="#">Inscription</Link>
        </Button>
        <ModeToggle />
      </span>
    </header>
  );
};

export default AuthHeaders;
