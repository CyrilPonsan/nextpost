import React from "react";

import RegisterForm from "@/components/register-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

const RegisterPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const { page } = await getDictionary(lang);

  return (
    <div className="flex justify-center">
      <RegisterForm trad={page.register} />
    </div>
  );
};

export default RegisterPage;
