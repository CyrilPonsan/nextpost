import NextAuth from "next-auth";
import Role from "./interfaces/role";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      roles: Role[];
    };
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }
}
