import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import LocaleSwitcher from "./locale-switcher";
import { Locale } from "@/i18n.config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getData() {
  const session = await getServerSession(authOptions);
  if (session) return session;
  return null;
}

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);

  const session = await getData();

  return (
    <header className="py-6">
      <nav className="container flex items-center justify-between">
        <ul className="flex gap-x-8">
          <li>
            <Link href={`/${lang}`}>{navigation.home}</Link>
          </li>
          <li>
            <Link href={`/${lang}/about`}>{navigation.about}</Link>
          </li>
          {session ? (
            <>
              <li>Profil</li>
              <li>
                <Link href={`/${lang}/signout`}>Déconnexion</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={`/${lang}/login`}>{navigation.login}</Link>
              </li>
              <li>
                <Link href={`/${lang}/register`}>{navigation.register}</Link>
              </li>
            </>
          )}
        </ul>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
