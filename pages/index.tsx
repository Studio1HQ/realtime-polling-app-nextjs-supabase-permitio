import { useEffect, useState } from "react";
import AllPolls from "@/components/AllPolls";
import { dummyData, PollProps } from "@/helpers";

export default function Home() {
  const [currentPolls, setCurrentPolls] = useState<PollProps[]>([]);
  const [pastPolls, setPastPolls] = useState<PollProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch active polls
    setCurrentPolls(dummyData);
    // fetch past polls
    setPastPolls(dummyData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main>
        <header className="mb-8">
          <h1 hidden>
            Welcome to <span className="text-2xl font-bold">VotesApp</span>
          </h1>
        </header>
        <p>Loading polls...</p>
      </main>
    );
  }

  return (
    <main>
      <header className="mb-8">
        <h1 hidden>
          Welcome to <span className="text-2xl font-bold">VotesApp</span>
        </h1>
      </header>

      <AllPolls title="Active Polls" polls={currentPolls} />
      <AllPolls title="Past Polls" polls={pastPolls} />
    </main>
  );
}
