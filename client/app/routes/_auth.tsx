import { Outlet } from "@remix-run/react";
import AuthHeaders from "~/components/navigation/AuthHeaders";

const AuthLayout = () => {
  return (
    <main>
      <AuthHeaders />
      <Outlet />
    </main>
  );
};

export default AuthLayout;
