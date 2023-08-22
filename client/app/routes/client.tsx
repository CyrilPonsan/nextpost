import { json, type ActionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import ClientHeaders from "~/components/navigation/ClientHeaders";
import { getUserProfileFromSession, logout } from "~/utils/auth.server";

export async function loader({ request }: ActionArgs) {
  // seul un utilisateur connecté a accès à cette route
  const user = await getUserProfileFromSession(request);
  console.log({ user });

  if (!user) {
    // si l'utilisateur n'existe pas on efface les cookies servant à l'authentification, celui généré par le frontend et ceux générés par l'api
    return await logout(request);
  }
  return json(user);
}

export async function action({ request }: ActionArgs) {
  // déconnecte l'utilisateur
  return await logout(request);
}

const ClientLayout = () => {
  const { user } = useLoaderData();
  console.log("user", user);
  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center">
      <ClientHeaders />
      <Outlet />
    </div>
  );
};

export default ClientLayout;
