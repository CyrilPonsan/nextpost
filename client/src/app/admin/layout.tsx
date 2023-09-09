import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { options } from "../api/auth/[...nextauth]/options";

async function checkRoles() {
  const session = await getServerSession(options);
  const roles = session?.user.roles;
  if (roles?.includes("inactif")) {
    redirect("/auth/signout");
  } else if (!roles?.includes("admin")) {
    redirect("/auth/signout");
  }
}

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  await checkRoles();
  return (
    <div>
      <h1>AdminLayout</h1>
      {children}
    </div>
  );
};

export default AdminLayout;
