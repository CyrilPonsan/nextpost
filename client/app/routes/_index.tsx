import { redirect, type ActionArgs } from "@remix-run/node";
import { getUserFromSession, logout } from "~/utils/auth.server";

export async function loader({ request }: ActionArgs) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    return await logout(request);
  }
  return redirect("/client/courriers");
}

const HomePage = () => {
  return null;
};

export default HomePage;
