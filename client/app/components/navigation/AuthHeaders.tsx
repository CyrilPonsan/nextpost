import { Link } from "@remix-run/react";

import Logo from "./Logo";

const AuthHeaders = () => {
  return (
    <header className="w-full h-[5vh] flex justify-between items-center pr-4 bg-primary/10">
      <Logo />
      <Link className="btn btn-sm btn-secondary" to="#">
        Inscription
      </Link>
    </header>
  );
};

export default AuthHeaders;
