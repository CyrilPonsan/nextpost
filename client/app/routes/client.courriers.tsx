import { json, redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import Pagination from "~/components/Pagination";
import CourrierItem from "~/components/courrier/CourrierItem";
import { getUserFromSession, logout } from "~/utils/auth.server";
import { getCourriers } from "~/utils/courriers.server";

export async function loader({ request }: ActionArgs) {
  // seul un utilisateur connecté a accès à cette route
  const cookie = request.headers.get("Cookie");
  if (!cookie) {
    return await logout(request);
  }
  // on vérifie que la session de l'utilisateur est valide, sinon il est redirigé vers la page de connexion
  await getUserFromSession(request);

  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";
  let type = searchParams.get("type") || "true";
  const field = searchParams.get("field") || "bordereau";
  const direction = searchParams.get("direction") || "DESC";

  if (type !== "true" && type !== "false") {
    type = "true";
  }

  try {
    const data = await getCourriers(
      cookie!,
      page,
      limit,
      type,
      field,
      direction
    );

    let intPage = parseInt(page);

    if (intPage > data.totalPages) {
      return redirect("?type=true");
    }

    return json({
      courriers: data.courriers,
      totalPages: data.totalPages,
      currentPage: intPage,
      currentType: type === "true",
    });
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
  const { courriers, currentType } = useLoaderData();

  return (
    <main className="w-full min-h-[95vh] flex flex-col justify-center items-center gap-y-8">
      {courriers ? (
        <section className="w-3/6 flex flex-col items-center gap-y-4">
          <article className="w-4/6 flex gap-x-8 text-secondary font-bold">
            <Link className={currentType ? "underline" : ""} to="?type=true">
              En cours de distribution
            </Link>
            <Link className={!currentType ? "underline" : ""} to="?type=false">
              Distribués
            </Link>
          </article>
          <article className="w-4/6">
            <ul className="w-full flex flex-col gap-y-4">
              {courriers.map((courrier: any) => (
                <li
                  className="shadow-lg rounded-lg bg-secondary/10 border border-secondary/50 p-2"
                  key={courrier.id}
                >
                  <CourrierItem courrier={courrier} />
                </li>
              ))}
            </ul>
          </article>
        </section>
      ) : null}
      <article className="flex items-center gap-x-4">
        <Pagination />
      </article>
    </main>
  );
};

export default Courriers;
