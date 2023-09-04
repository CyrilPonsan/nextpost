import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { Input } from "./@/components/ui/input";
import { Label } from "./@/components/ui/label";

import LoadinfButton from "./buttons/LoadinfButton";
const LoginForm = () => {
  const credentialsError = useActionData();
  const navigation = useNavigation();

  const isLoading = navigation.state !== "idle";

  const style = "w-full flex flex-col gap-y-2 justify-center items-center";

  return (
    <Form
      className="w-full h-full flex flex-col gap-y-2 items-center"
      method="post"
    >
      <div className="w-full flex-1 text-primary flex flex-col justify-evenly items-center gap-y-2 p-8 rounded-xl shadow-xl bg-background border border-ring">
        {/* email */}
        <span className={style}>
          <Label htmlFor="username">Email</Label>
          <Input
            id="username"
            type="email"
            name="username"
            autoComplete="true"
            required
          />
        </span>

        {/* password */}
        <span className={style}>
          <Label htmlFor="password">Mot de Passe</Label>
          <Input
            id="password"
            type="password"
            name="password"
            minLength={8}
            autoComplete="true"
            required
          />
        </span>
        <Link className="text-xs hover:underline" to="#">
          Mot de passe oublié ?
        </Link>
      </div>
      {/* bouton et message d'erreurs */}
      <div>
        <div
          className={credentialsError ? "w-full visible" : "w-full invisible"}
        >
          <p className="text-destructive font-bold text-center">
            {credentialsError ?? "toto "}
          </p>
        </div>
        <span className="w-full flex justify-center mt-2">
          <LoadinfButton type="submit" isLoading={isLoading} />
        </span>
      </div>
    </Form>
  );
};

export default LoginForm;
