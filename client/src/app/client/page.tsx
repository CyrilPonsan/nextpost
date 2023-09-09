import { sendRequest } from "@/utils/interceptor";
import Link from "next/link";
import React from "react";

export async function getData() {
  console.log(
    await sendRequest({
      path: "/courrier",
    })
  );
}

const ClientHomePage = async () => {
  await getData();
  return (
    <>
      <div>Client Home Page</div>
      <Link href="/auth/signout">Déconnexion</Link>
    </>
  );
};

export default ClientHomePage;
