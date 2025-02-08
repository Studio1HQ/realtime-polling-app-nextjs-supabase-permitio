import React, { useEffect, useState } from "react";
import NewPoll from "@/components/NewPoll";
import AllPolls from "@/components/AllPolls";
import ErrorMessage from "@/components/ErrorMessage";
import { dummyData, PollProps } from "@/helpers";

const Page = () => {
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState<PollProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    setPolls(dummyData);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!user ? (
        <ErrorMessage />
      ) : (
        <main>
          <NewPoll />
          <AllPolls title="Your Polls" polls={polls} />
        </main>
      )}
    </div>
  );
};

export default Page;
