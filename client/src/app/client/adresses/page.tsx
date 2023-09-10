import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import React from "react";

export async function getData() {
  const session = await getServerSession(options);
  console.log(session);
}

const AdressesHomePage = async () => {
  await getData();
  return <div>{"Carnet d'adresses"}</div>;
};

export default AdressesHomePage;
