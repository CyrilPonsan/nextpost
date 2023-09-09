import AuthProvider from "@/context/auth-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Post",
  description: "Opérateur postal privé basé sur Gélos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-theme="winter">
      <body
        className={
          inter.className + "w-screen min-h-screen flex flex-col items-center"
        }
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
