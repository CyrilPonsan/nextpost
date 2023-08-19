import { Outlet } from "@remix-run/react";
import AuthHeaders from "~/components/navigation/AuthHeaders";

const AuthLayout = () => {
  return (
    <main className="bg-info/20">
      <AuthHeaders />
      <Outlet />
    </main>
  );
};

export default AuthLayout;
