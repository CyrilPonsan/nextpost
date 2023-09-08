import React from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import { options } from "@/app/api/auth/[...nextauth]/options";

export async function checkSession() {
  const session = await getServerSession(options);
  if (session) {
    const roles = session?.user.roles;
    if (roles![0] === "admin") {
      redirect("/admin");
    } else if (roles![0] === "expediteur") {
      redirect("/client");
    }
  }
}

const SignInPage = async () => {
  await checkSession();
  return <Link href="/api/auth/signin">Login</Link>;
};

export default SignInPage;
