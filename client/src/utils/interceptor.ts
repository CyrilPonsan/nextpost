import { options } from "@/app/api/auth/[...nextauth]/options";
import BASE_URL from "@/config/urls";
import { getServerSession } from "next-auth";

interface CustomRequest {
  path: string;
  method?: string;
  body?: {};
}

export async function sendRequest(req: CustomRequest) {
  const session = await getServerSession(options);
  const cookie = session?.user.accessToken;

  const response = await fetch(`${BASE_URL}${req.path}`, {
    headers: { Cookie: cookie ?? "" },
  });
  return await response.json();
}
