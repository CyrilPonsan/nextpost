import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "./@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  const { currentPage, currentType, totalPages } = useLoaderData();

  return (
    <>
      {currentPage > 1 ? (
        <Button asChild size="sm" className="rounded-full">
          <Link
            to={`?page=${currentPage - 1}&type=${currentType}`}
            aria-label="visitez la page précédente"
          >
            <ChevronLeft className="h-3 w-3" />
          </Link>
        </Button>
      ) : (
        <Button size="sm" className="rounded-full" disabled={true}>
          <ChevronLeft className="h-3 w-3" />
        </Button>
      )}

      {totalPages > 1 ? (
        <p className="text-primary text-xs">
          {currentPage} / {totalPages}
        </p>
      ) : null}
      {currentPage < totalPages ? (
        <Button asChild size="sm" className="rounded-full">
          <Link
            to={`?page=${currentPage + 1}&type=${currentType}`}
            aria-label="visitez la page suivante"
          >
            <ChevronRight className="h-3 w-3" />
          </Link>
        </Button>
      ) : (
        <Button size="sm" className="rounded-full" disabled={true}>
          <ChevronRight className="h-3 w-3" />
        </Button>
      )}
    </>
  );
};

export default Pagination;
