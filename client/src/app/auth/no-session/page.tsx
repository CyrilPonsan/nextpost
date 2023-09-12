import LoginForm from "@/components/formulaires/login-form";
import Link from "next/link";
import React from "react";

const NoSessionPage = () => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <p>Votre session a expiré</p>
      <LoginForm />
    </div>
  );
};

export default NoSessionPage;
