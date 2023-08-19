import { redirect, type ActionArgs } from "@remix-run/node";

import { getUserFromSession } from "~/utils/session.server";

export async function loader({ request }: ActionArgs) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    return redirect("/login");
  }
  return null;
}

const Adresses = () => {
  return <div>Coucou je suis la page adresses</div>;
};

export default Adresses;
