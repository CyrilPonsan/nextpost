"use client";

import React from "react";

const Error = ({ error }: { error: any }) => {
  console.log("error", error);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {error.message}
    </div>
  );
};

export default Error;
