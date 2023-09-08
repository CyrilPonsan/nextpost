"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        router.push("/client");
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form
      className="w-2/6 flex flex-col gap-y-4 text-secondary"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-extrabold">Connexion</h1>
      {error && (
        <p className="text-center bg-destructive py-4 mb-6 rounded">{error}</p>
      )}
      <div className="mb-2">
        <Label className="pl-1" htmlFor="email">
          Adresse Email
        </Label>
        <Input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Adresse Email"
        />
      </div>
      <Separator />
      <div>
        <Label className="pl-1" htmlFor="password">
          Mot de Passe
        </Label>
        <Input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Mot de Passe"
        />
      </div>
      <div className="w-full flex justify-center">
        <Button size="lg" type="submit" disabled={loading}>
          {loading ? "loading..." : "Sign In"}
        </Button>
      </div>
    </form>
  );
}
