import type { AxiosResponse } from "axios";
import axios from "axios";

export async function getCourriers(
  cookie: string,
  page: string,
  limit: string,
  type: string,
  field: string,
  direction: string
) {
  try {
    console.log({ page, limit, type, field, direction });

    const response: AxiosResponse = await axios.get(
      `http://localhost:4000/v1/courrier?page=${page}&limit=${limit}&type=${type}&field=${field}&direction=${direction}`,
      { headers: { Cookie: cookie || "" } }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
