import BASE_URL from "@/config/urls";
import axios, { AxiosResponse } from "axios";
import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: any) {
  try {
    const url = `${BASE_URL}/auth/refresh`;

    const response = await fetch(url, {
      headers: {
        Cookie: token.refreshToken,
      },
    });

    const accessToken = response.headers.getSetCookie()[0];
    const refreshToken = response.headers.getSetCookie()[1];

    return {
      ...token,
      accessToken,
      expiresAt: Date.now() + 8 * 1000,
      refreshToken,
    };
  } catch (error: any) {
    console.log(error);

    return {
      ...token,
      error: error.message,
    };
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const response: AxiosResponse = await axios.post(
          "http://localhost:4000/v1/auth/",
          {
            username: credentials?.email,
            password: credentials?.password,
          }
        );

        let user = response.data;

        if (user) {
          const accessToken: string = response.headers["set-cookie"]![0];
          const refreshToken: string = response.headers["set-cookie"]![1];
          user = {
            ...user,
            accessToken,
            refreshToken,
            expiresAt: new Date().getTime() + 8 * 1000,
          };

          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
          user: {
            id: user.id,
            roles: user.roles,
          },
        };
      }
      if (Date.now() - 2000 < token.expiresAt) {
        return token;
      }

      const refreshedToken = await refreshAccessToken(token);
      return refreshedToken;
    },

    async session({ session, token }: { session: Session; token: any }) {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expiresAt = token.expiresAt;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
