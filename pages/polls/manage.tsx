import NewPoll from "@/components/NewPoll";
import PollGrid from "@/components/PollGrid";
import React from "react";

const Page = () => {
  return (
    <main>
      <NewPoll />

      <PollGrid title="Your Polls" polls={["1", "2", "3", "4", "5", "6"]} />
    </main>
  );
};

export default Page;
