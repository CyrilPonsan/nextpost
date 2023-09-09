import { options } from "@/app/api/auth/[...nextauth]/options";
import BASE_URL from "@/config/urls";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

interface CustomRequest {
  path: string;
  method?: string;
  body?: {};
}

export async function sendRequest(req: CustomRequest) {
  const session = await getServerSession(options);
  console.log(session);

  const cookie = session?.user?.accessToken;

  let response = await fetch(`${BASE_URL}${req.path}`, {
    headers: { Cookie: cookie ?? "" },
  });

  console.log(response.status);
  if (response.status === 403) {
    console.log("refreshing cookies");

    response = await fetch(`${BASE_URL}/auth/refresh`, {
      headers: { Cookie: session?.user.refreshToken ?? "" },
    });
    if (response.status === 403) {
      console.log("dans le cul lulu");
    } else {
      const accessToken = response.headers.getSetCookie()[0];
      const refreshToken = response.headers.getSetCookie()[1];

      console.log("all good baby");

      if (session) {
        session.user = { ...session.user, accessToken };
      }

      const newSession = await getServerSession(options);
      console.log({ newSession });

      response = await fetch(`${BASE_URL}${req.path}`, {
        headers: { Cookie: newSession!.user.accessToken ?? "" },
      });
    }
  }

  return await response.json();
}
