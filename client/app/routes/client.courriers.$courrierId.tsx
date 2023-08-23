import { json, type ActionArgs } from "@remix-run/node";
import { regexNumber } from "~/libs/regex";

import { getUserFromSession, logout } from "~/utils/auth.server";
import { getCourrierDetails } from "~/utils/courriers.server";

export async function loader({ request, params }: ActionArgs) {
  const courrierId = params.courrierId;

  if (!courrierId || !regexNumber.test(courrierId)) {
    return await logout(request);
  }

  // seul un utilisateur connecté a accès à cette route
  const cookie = request.headers.get("Cookie");
  if (!cookie) {
    return await logout(request);
  }

  const userId = await getUserFromSession(request);
  if (!userId) {
    return await logout(request);
  }

  try {
    const response = await getCourrierDetails(+courrierId, cookie);
    return json(response);
  } catch (error: any) {
    throw error;
  }
}

const CourrierDetails = () => {
  return <div>courrier details page</div>;
};

export default CourrierDetails;
