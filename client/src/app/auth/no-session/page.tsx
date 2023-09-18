import React from "react";

import LoginForm from "@/components/formulaires/login-form";

const NoSessionPage = () => {
  return (
    <section className="w-full min-h-[95vh] flex justify-center items-center">
      <LoginForm errorMsg="Votre session a expiré, reconnectez-vous" />
    </section>
  );
};

export default NoSessionPage;
