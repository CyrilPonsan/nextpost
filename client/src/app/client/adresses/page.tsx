import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import React from "react";

async function getData() {
  const session = await getServerSession(options);
  return session;
}

const AdressesHomePage = async () => {
  //const data = await getData();
  return <div>{"Carnet d'adresses"}</div>;
};

export default AdressesHomePage;
