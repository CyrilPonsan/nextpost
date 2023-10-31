import CheckMailForm from "@/components/password/check-mail-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import React from "react";

const PasswordRestPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const { page } = await getDictionary(lang);

  return (
    <div className=" min-h-[70vh] flex flex-col justify-center items-center">
      <div className="flex justify-center my-4">
        <h1 className="text-2xl font-extrabold">{page.password.title}</h1>
      </div>
      <CheckMailForm trad={page.password} />
    </div>
  );
};

export default PasswordRestPage;
