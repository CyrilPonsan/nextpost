import { Outlet } from "@remix-run/react";
import { type ActionArgs } from "@remix-run/node";

import { getUserFromSession, logout } from "~/utils/auth.server";

export async function loader({ request }: ActionArgs) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    return await logout(request);
  }
  return null;
}

const CourriersLayout = () => {
  return <Outlet />;
};

export default CourriersLayout;
