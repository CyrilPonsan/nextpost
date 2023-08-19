import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import LoadinfButton from "./buttons/LoadinfButton";

const LoginForm = () => {
  const credentialsError = useActionData();
  const navigation = useNavigation();

  const isLoading = navigation.state !== "idle";

  const style = "flex flex-col gap-y-2 justify-center items-center";
  const inputStyle = "input bg-neutral/20";

  return (
    <Form
      className="text-primary flex flex-col gap-y-2 justify-center items-center p-4 rounded-xl shadow-xl bg-info/70"
      method="post"
    >
      <div className={style}>
        <label htmlFor="username">Email</label>
        <input
          className={inputStyle}
          id="username"
          type="email"
          name="username"
          autoComplete="true"
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
          autoComplete="true"
          required
        />
      </div>
      <Link className="text-xs hover:underline" to="#">
        Mot de passe oublié ?
      </Link>
      {credentialsError ? <div>{credentialsError}</div> : null}
      <div className="w-full flex justify-center mt-2">
        <LoadinfButton type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};

export default LoginForm;
