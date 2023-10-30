import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";

import { authOptions } from "../../api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

async function getData() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  return session;
}

const DashboardPage = async () => {
  const data = await getData();

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default DashboardPage;
