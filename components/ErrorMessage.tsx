import React from "react";
import LogInButton from "./LogInButton";

const ErrorMessage = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h1 className="text-4xl font-bold">User is unauthenticated</h1>
      <p>Please log in to view this page.</p>
      <LogInButton />
    </div>
  );
};

export default ErrorMessage;
