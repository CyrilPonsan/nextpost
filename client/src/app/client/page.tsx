import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";

import BASE_URL from "@/config/urls";
import { options } from "../api/auth/[...nextauth]/options";
import FetchError from "@/types/fetch-error";

async function getData() {
  try {
    const session = await getServerSession(options);

    if (!session) redirect("/auth/signout");

    const response = await fetch(
      `${BASE_URL}/courrier?page=1&limit=10&type=true&field=bordereau&direction=DESC`,
      {
        headers: { Cookie: session?.accessToken! },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        redirect("/auth/no-session");
      }
    }

    return response.json();
  } catch (error: unknown) {
    throw error;
  }
}

const ClientHomePage = async () => {
  const data = await getData();
  //console.log({ data });

  return (
    <>
      <div>Client Home Page</div>
      <Link href="/auth/signout">Déconnexion</Link>
      <p color="primary">{data.totalPages}</p>
      {data.courriers ? (
        <ul>
          {data.courriers.map((courrier: any) => (
            <li key={courrier.id}>{courrier.bordereau}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default ClientHomePage;
