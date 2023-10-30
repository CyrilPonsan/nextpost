"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { i18n } from "@/i18n.config";

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <ul className="flex gap-x-3 items-center">
      {i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            <Button size="icon" variant="outline" asChild>
              <Link href={redirectedPathName(locale)}>{locale}</Link>
            </Button>
          </li>
        );
      })}
      <li>
        <ModeToggle />
      </li>
    </ul>
  );
}
