import { Form, Link } from "@remix-run/react";

import LogoutIcon from "../svg/LogoutIcon";
import Logo from "./Logo";

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
  return (
    <div className="w-full flex items-center justify-center ">
      <Logo />
      <div className="h-[5vh] flex flex-1 gap-x-4 items-center justify-center bg-primary/10 text-secondary pr-4">
        <ul className="flex items-center gap-x-4">
          {menu.map(({ index, path, title }) => (
            <li key={index}>
              <Link className="hover:text-info" to={path}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <Form method="delete" className="flex items-center">
          <button className="text-sm hover:text-info" aria-label="deconnexion">
            <div className="w-6 h-6">
              <LogoutIcon />
            </div>
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ClientHeaders;
