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
      <section className="w-fit grid grid-cols-1">
        <div className="w-full h-full flex flex-col items-center gap-y-4">
          <div className="text-2xl font-extrabold text-primary">Connexion</div>
          <div className="w-full flex-1 flex justify-center">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
