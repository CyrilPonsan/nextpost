import { type ActionArgs } from "@remix-run/node";

import LoginForm from "~/components/LoginForm";
import { login } from "~/utils/session.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  if (typeof password == "string" && typeof username === "string") {
    console.log({ username, password });

    return await login(username, password);
  }
};

const LoginPage = () => {
  return (
    <main className="bg-gradient-to-b from-primary to-info min-h-screen flex justify-center items-center">
      <section className="w-3/6 h-5/6 bg-pink-400 grid grid-cols-2 gap-32">
        <LoginForm />
        <div className="w-full h-full bg-[url('/images/login.jpg')] bg-cover bg-center bg-no-repeat rounded-xl shadow-xl"></div>
      </section>
    </main>
  );
};

export default LoginPage;
