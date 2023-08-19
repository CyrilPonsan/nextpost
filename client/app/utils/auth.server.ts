import axios from "axios";
import type { AxiosResponse } from "axios";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET!;

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
    //const refreshToken: string = response.headers["set-cookie"]![1];

    const user = response.data;
    return createUserSession(
      user.id,
      user.role,
      accessToken,
      "/client/courriers"
    );
  } catch (error: any) {
    throw error;
  }
}

export async function logout(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const cookie = request.headers.get("Cookie");
  await axios.get("http://localhost:4000/v1/auth", {
    headers: { Cookie: cookie || "" },
  });
  const headers = new Headers();
  headers.append("Set-Cookie", await sessionStorage.destroySession(session));
  headers.append(
    "Set-cookie",
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  );
  return redirect("/login", {
    headers,
  });
}

async function createUserSession(
  userId: string,
  userRole: string,
  accessToken: string,
  redirectPath: string
) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  session.set("userRole", userRole);

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
  const headers = new Headers();
  headers.append("Set-Cookie", await sessionStorage.destroySession(session));
  headers.append("Set-cookie", "accessToken=");
  return redirect(redirectPath, {
    headers,
  });
}
