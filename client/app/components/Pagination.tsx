import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "./@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  const { currentPage, currentType, totalPages } = useLoaderData();

  return (
    <>
      {currentPage > 1 ? (
        <Button asChild size="icon" className="rounded-full">
          <Link
            to={`?page=${currentPage - 1}&type=${currentType}`}
            aria-label="visitez la page précédente"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button size="icon" className="rounded-full" disabled={true}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {totalPages > 1 ? (
        <p className="text-ring text-xs">
          {currentPage} / {totalPages}
        </p>
      ) : null}
      {currentPage < totalPages ? (
        <Button asChild size="icon" className="rounded-full">
          <Link
            to={`?page=${currentPage + 1}&type=${currentType}`}
            aria-label="visitez la page suivante"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button size="icon" className="rounded-full" disabled={true}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export default Pagination;
