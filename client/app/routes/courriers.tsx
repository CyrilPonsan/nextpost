import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getCourriers } from "~/utils/courriers.server";
import { getUserFromSession } from "~/utils/session.server";

export async function loader({ request }: { request: any }) {
  const cookie = request.headers.get("Cookie");
  const user = await getUserFromSession(request);

  console.log({ user });

  if (!user) {
    return redirect("/");
  }

  const courriers = await getCourriers(cookie);

  return json(courriers);
}

const Courriers = () => {
  const courriers = useLoaderData();

  return (
    <>
      <ul>
        {courriers.map((courrier: any) => (
          <li key={courrier.id}>
            <p>{courrier.adresse}</p>
          </li>
        ))}
      </ul>
      <Link className="btn btn-primary" to="/adresses">
        Adresses
      </Link>
    </>
  );
};

export default Courriers;
