import { Form } from "@remix-run/react";

const LoginForm = () => {
  const style = "flex flex-col gap-y-2 justify-center items-center";
  const inputStyle = "input bg-neutral/20";

  return (
    <Form
      className="text-primary flex flex-col gap-y-2 justify-center items-center p-4 rounded-xl shadow-xl bg-info/50"
      method="post"
    >
      <div className={style}>
        <label htmlFor="username">Email</label>
        <input
          className={inputStyle}
          id="username"
          type="email"
          name="username"
          required
        />
      </div>

      <div className={style}>
        <label htmlFor="password">Mot de Passe</label>
        <input
          className={inputStyle}
          id="password"
          type="password"
          name="password"
          minLength={8}
          required
        />
      </div>

      <div className="w-full flex justify-center mt-2">
        <button className="btn btn-primary" type="submit">
          Se Connecter
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;
