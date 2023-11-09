import React from "react";

import CheckMailForm from "@/components/password/check-mail-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

const PasswordRestPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const { page, errors, responses } = await getDictionary(lang);

  const trad = {
    page: page.password,
    errors: errors.password,
    responses,
  };

  console.log({ trad });

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center">
      <CheckMailForm trad={trad} />
    </div>
  );
};

export default PasswordRestPage;
