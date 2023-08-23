import { Form, Link, useLoaderData } from "@remix-run/react";
import { Button } from "../@/components/ui/button";
import { LogOut } from "lucide-react";

import Logo from "./Logo";
import { ModeToggle } from "../ModeToggle";

const menu = [
  {
    index: 1,
    path: "/client/courriers",
    title: "Courriers",
  },
  {
    index: 2,
    path: "/client/adresses",
    title: "Adresses",
  },
];

const ClientHeaders = () => {
  const data = useLoaderData();
  console.log({ data });

  return (
    <div className="w-full flex items-center justify-center bg-accent text-primary pr-4">
      <Logo />
      <div className="h-[5vh] flex flex-1 gap-x-4 items-center justify-center">
        <ul className="flex items-center gap-x-4">
          {menu.map(({ index, path, title }) => (
            <li key={index}>
              <Link className="hover:text-info" to={path}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-x-2 items-center">
        <p className="capitalize font-bold">{data}</p>
        <Form method="delete" className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            aria-label="deconnexion"
            className="bg-transparent"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </Form>
        <ModeToggle />
      </div>
    </div>
  );
};

export default ClientHeaders;
