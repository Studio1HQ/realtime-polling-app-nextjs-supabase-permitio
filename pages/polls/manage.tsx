import NewPoll from "@/components/NewPoll";
import AllPolls from "@/components/AllPolls";
import React from "react";
import ErrorMessage from "@/components/ErrorMessage";
import polls from "@/helpers";

const Page = () => {
  const user = null;
  return (
    <div>
      {user ? (
        <main>
          <NewPoll />

          <AllPolls title="Your Polls" polls={polls} />
        </main>
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
};

export default Page;
