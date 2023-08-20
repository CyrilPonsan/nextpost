import { Link } from "@remix-run/react";

const Logo = () => {
  return (
    <Link
      className="h-[5vh] bg-transparent pl-4 text-3xl text-secondary font-extrabold flex items-center"
      to="/"
    >
      remixPOST
    </Link>
  );
};

export default Logo;
