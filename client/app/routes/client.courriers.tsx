import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import CourrierItem from "~/components/courrier/CourrierItem";

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
  const type = searchParams.get("type") || "true";
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
  const courriers = useLoaderData();

  return (
    <main className="w-full min-h-[95vh] flex justify-center items-center text-primary">
      {courriers ? (
        <ul className="w-3/6">
          <li>{courriers.length}</li>
          {courriers.map((courrier: any) => (
            <li key={courrier.id}>
              <CourrierItem courrier={courrier} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Coucou</p>
      )}
    </main>
  );
};

export default Courriers;
