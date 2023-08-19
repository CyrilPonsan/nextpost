import type { AxiosResponse } from "axios";
import axios from "axios";

export async function getCourriers(cookie: string) {
  try {
    console.log(cookie);

    const response: AxiosResponse = await axios.get(
      "http://localhost:4000/v1/expediteur",
      { headers: { Cookie: cookie || "" } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
