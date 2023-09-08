import { sendRequest } from "@/utils/interceptor";
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
  return <div>Client Home Page</div>;
};

export default ClientHomePage;
