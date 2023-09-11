"use client";

import FetchError from "@/types/fetch-error";
import React from "react";

const Error = ({ error }: { error: FetchError }) => {
  console.log("error", error);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {error.statusCode}
    </div>
  );
};

export default Error;
