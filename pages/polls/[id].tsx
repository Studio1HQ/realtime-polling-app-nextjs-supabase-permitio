import ViewPoll from "@/components/ViewPoll";
import React from "react";
import ErrorMessage from "@/components/ErrorMessage";
import polls from "@/helpers";
import { useRouter } from "next/router";

const Page = () => {
  const user = null;
  const { query } = useRouter();
  const poll = polls.find(poll => poll.id === query.id);

  return !user ? (
    <ErrorMessage />
  ) : poll ? (
    <ViewPoll poll={poll} />
  ) : (
        <p>Poll not found. 
          
    </p>
  );
};

export default Page;
