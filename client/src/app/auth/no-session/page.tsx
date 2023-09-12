import Link from "next/link";
import React from "react";

const NoSessionPage = () => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <p>Votre session a expiré</p>
      <Link className="btn btn-primary btn-sm" href="/auth/signout">
        Reconnexion
      </Link>
    </div>
  );
};

export default NoSessionPage;
