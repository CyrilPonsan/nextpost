import Link from "next/link";
import React, { ReactNode } from "react";

const SigninLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header className="w-screen h-[5vh] flex items-center justify-end p-2">
        <nav>
          <Link className="btn btn-sm btn-primary btn-outline" href="#">
            Inscription
          </Link>
        </nav>
      </header>
      <main className="w-screen min-h-[95vh]">{children}</main>
    </div>
  );
};

export default SigninLayout;
