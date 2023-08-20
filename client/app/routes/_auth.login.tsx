import { redirect, type ActionArgs } from "@remix-run/node";

import LoginForm from "~/components/LoginForm";
import { validateCredentials } from "~/helpers/validations/login";
import { login } from "~/utils/auth.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  if (typeof password == "string" && typeof username === "string") {
    try {
      validateCredentials({ username, password });
    } catch (error: any) {
      return error;
    }

    try {
      return await login(username, password);
    } catch (error: any) {
      if (error.response.status === 401) {
        return error.response.data.message;
      } else {
        return redirect("/login");
      }
    }
  }
};

const LoginPage = () => {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <section className="w-4/6 md:w-5/6 lg:w-4/6 xl:w-4/6 2xl:w-3/6 grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-32">
        <div className="h-fit flex flex-col items-center gap-y-4">
          <div className="text-2xl font-extrabold text-primary">Connexion</div>
          <LoginForm />
        </div>
        <div className="w-full h-[30rem] bg-[url('/images/step-post.jpg')] bg-cover bg-center bg-no-repeat rounded-xl shadow-xl"></div>
      </section>
    </main>
  );
};

export default LoginPage;
