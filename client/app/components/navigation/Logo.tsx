import { Link } from "@remix-run/react";

const Logo = () => {
  return (
    <Link
      className="h-[5vh] bg-primary pl-4 text-3xl text-white font-extrabold flex items-center"
      to="/"
    >
      remixPOST
    </Link>
  );
};

export default Logo;
