import axios from "axios";
import type { AxiosResponse } from "axios";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

import { badRequest } from "./request.server";

const SESSION_SECRET = process.env.SESSION_SECRET!;

console.log({ SESSION_SECRET });

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
  },
});

export async function login(username: string, password: string) {
  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:4000/v1/auth",
      {
        username: username,
        password: password,
      }
    );
    const accessToken: string = response.headers["set-cookie"]![0];
    const refreshToken: string = response.headers["set-cookie"]![1];

    const user = response.data;
    return createUserSession(
      user.id,
      user.role,
      accessToken,
      refreshToken,
      "/courriers"
    );
  } catch (error) {
    return badRequest(error);
  }
}

/* export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
 */
async function createUserSession(
  userId: string,
  userRole: string,
  accessToken: string,
  refreshToken: string,
  redirectPath: string
) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  session.set("userRole", userRole);
  session.set("accessToken", accessToken);
  session.set("refreshToken", refreshToken);

  const headers = new Headers();
  headers.append("Set-Cookie", await sessionStorage.commitSession(session));

  headers.append("Set-cookie", accessToken);

  return redirect(redirectPath, { headers });
}

export async function getUserFromSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");
  if (!userId) {
    return null;
  }
  return userId;
}

export async function destroyUserSession(
  request: Request,
  redirectPath: string
) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
