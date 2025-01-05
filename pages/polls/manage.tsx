import NewPoll from "@/components/NewPoll";
import AllPolls from "@/components/AllPolls";
import React from "react";

const Page = () => {
  return (
    <main>
      <NewPoll />

      <AllPolls title="Your Polls" polls={["1", "2", "3", "4", "5", "6"]} />
    </main>
  );
};

export default Page;
