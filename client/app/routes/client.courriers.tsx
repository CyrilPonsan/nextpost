import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
  useSearchParams,
} from "@remix-run/react";
import CourrierItem from "~/components/courrier/CourrierItem";
import usePagination from "~/hooks/usePagination";

import { getUserFromSession, logout } from "~/utils/auth.server";
import { getCourriers } from "~/utils/courriers.server";

export async function loader({ request, params }: ActionArgs) {
  // seul un utilisateur connecté a accès à cette route
  const cookie = request.headers.get("Cookie");

  if (!cookie) {
    return await logout(request);
  }

  const user = await getUserFromSession(request);

  if (!user) {
    return await logout(request);
  }

  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const type = searchParams.get("type") || "false";
  const field = searchParams.get("field") || "nom";
  const direction = searchParams.get("field") || "ASC";

  try {
    const courriers = await getCourriers(
      cookie!,
      page,
      limit,
      type,
      field,
      direction
    );
    return json(courriers);
  } catch (error: any) {
    throw error;
  }
}

export const ErrorBoundary = () => {
  const error: any = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    return <p>{error.data?.message}</p>;
  } else {
    return <p className="h-full">{error.message}</p>;
  }
};

const Courriers = () => {
  const data = useLoaderData();
  const searchParams = useSearchParams();
  const { pagination } = usePagination();

  console.log(searchParams);

  return (
    <main className="w-full min-h-[95vh] flex flex-col justify-center items-center gap-y-4 text-primary">
      {data.courriers ? (
        <ul className="w-3/6">
          {data.courriers.map((courrier: any) => (
            <li key={courrier.id}>
              <CourrierItem courrier={courrier} />
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex items-center gap-x-4">
        <Link className="btn btn-circle btn-sm btn-primary" to="#">
          {"<"}
        </Link>
        {data.totalPages > 1 ? (
          <p>
            {pagination.page} / {data.totalPages}
          </p>
        ) : null}
        <Link
          className="btn btn-circle btn-sm btn-primary"
          to={`?page=${pagination.page + 1}`}
        >
          {">"}
        </Link>
      </div>
    </main>
  );
};

export default Courriers;
