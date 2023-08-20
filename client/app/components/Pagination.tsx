import { Link, useLoaderData } from "@remix-run/react";

const Pagination = () => {
  const { currentPage, currentType, totalPages } = useLoaderData();

  return (
    <>
      {currentPage > 1 ? (
        <Link
          className="btn btn-circle btn-sm btn-secondary"
          to={`?page=${currentPage - 1}&type=${currentType}`}
        >
          {"<"}
        </Link>
      ) : (
        <button className="btn btn-circle btn-sm btn-secondary" disabled={true}>
          {"<"}
        </button>
      )}

      {totalPages > 1 ? (
        <p>
          {currentPage} / {totalPages}
        </p>
      ) : null}
      {currentPage < totalPages ? (
        <Link
          className="btn btn-circle btn-sm btn-secondary"
          to={`?page=${currentPage + 1}&type=${currentType}`}
        >
          {">"}
        </Link>
      ) : (
        <button className="btn btn-circle btn-sm btn-secondary" disabled={true}>
          {">"}
        </button>
      )}
    </>
  );
};

export default Pagination;
