import LoginForm from "@/components/login-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

const LoginPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const { page } = await getDictionary(lang);

  return (
    <div className="flex justify-center">
      <LoginForm trad={page.login} />
    </div>
  );
};

export default LoginPage;
