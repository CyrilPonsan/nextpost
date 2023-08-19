import { type ActionArgs } from "@remix-run/node";

import { getUserFromSession, logout } from "~/utils/auth.server";

export async function loader({ request }: ActionArgs) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    return await logout(request);
  }
  return null;
}

const Adresses = () => {
  return <div>Coucou je suis la page adresses</div>;
};

export default Adresses;
