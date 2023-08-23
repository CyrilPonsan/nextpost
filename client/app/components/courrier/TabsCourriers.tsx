import { Button } from "../@/components/ui/button";
import { Link, useLoaderData } from "@remix-run/react";

const TabsCourriers = () => {
  const { currentType } = useLoaderData();

  return (
    <span className="w-fit flex p-2 bg-secondary rounded-lg">
      <Button
        variant={currentType ? undefined : "outline"}
        asChild
        className="rounded-l-lg rounded-r-none"
      >
        <Link to="?type=true">En cours de distribution</Link>
      </Button>
      <Button
        variant={!currentType ? undefined : "outline"}
        asChild
        className="rounded-l-none rounded-r-lg"
      >
        <Link to="?type=false">Distribués</Link>
      </Button>
    </span>
  );
};

export default TabsCourriers;
