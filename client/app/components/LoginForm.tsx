import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { Input } from "./@/components/ui/input";
import { Label } from "./@/components/ui/label";

import LoadinfButton from "./buttons/LoadinfButton";
const LoginForm = () => {
  const credentialsError = useActionData();
  const navigation = useNavigation();

  const isLoading = navigation.state !== "idle";

  const style = "flex flex-col gap-y-2 justify-center items-center";

  return (
    <Form
      className="text-primary flex flex-col gap-y-2 justify-center items-center p-4 rounded-xl shadow-xl bg-background border border-ring"
      method="post"
    >
      <div className={style}>
        <Label htmlFor="username">Email</Label>
        <Input
          id="username"
          type="email"
          name="username"
          autoComplete="true"
          required
        />
      </div>
      <div className={style}>
        <Label htmlFor="password">Mot de Passe</Label>
        <Input
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
