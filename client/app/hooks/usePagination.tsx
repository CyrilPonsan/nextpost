import { useState } from "react";
import { BASE_URL } from "~/config/urls";

const usePagination = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState(true);
  const [field, setField] = useState("nom");
  const [direction, setDirection] = useState("DESC");
  const [url, setUrl] = useState("");

  const urlHandler = () => {
    return `${BASE_URL}?page=${page}&limit=${limit}&type=${type}&field=${field}&direction=${direction}`;
  };

  return {
    pagination: { page, setPage, setLimit, setType, setField, setDirection },
    urlHandler,
  };
};

export default usePagination;
