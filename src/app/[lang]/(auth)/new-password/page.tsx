import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import React from "react";

const NewPassword = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const { page, errors, responses } = await getDictionary(lang);
  const trad = {
    page: page.newPassword,
    errors: page.newPassword,
    responses: page.newPassword,
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center"></div>
  );
};

export default NewPassword;
