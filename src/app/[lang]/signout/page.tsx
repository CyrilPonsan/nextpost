"use client";

import React from "react";
import { signOut } from "next-auth/react";

const SignOutPage = () => {
  signOut({ callbackUrl: "/" });

  return null;
};

export default SignOutPage;
