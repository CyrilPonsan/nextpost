"use client";

import React from "react";
import { signOut } from "next-auth/react";
import BASE_URL from "@/config/urls";

const SignOutPage = () => {
  async function logout() {
    await fetch(`${BASE_URL}/auth/`);
  }

  logout();
  signOut({ callbackUrl: "/auth/signin" });

  return <div>logout</div>;
};

export default SignOutPage;
