import { useEffect, useState } from "react";
import AllPolls from "@/components/AllPolls";
import { PollProps } from "@/helpers";
import { createClient } from "@/utils/supabase/component";

export default function Home() {
  const [currentPolls, setCurrentPolls] = useState<PollProps[]>([]);
  const [pastPolls, setPastPolls] = useState<PollProps[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      const now = new Date().toISOString();

      try {
        // Fetch active polls
        const { data: activePolls, error: activeError } = await supabase
          .from("polls")
          .select(
            `
            id,
            question,
            expires_at,
            creator_name,
            created_by,
            votes (count)
          `
          )
          .gte("expires_at", now)
          .order("created_at", { ascending: false });

        if (activeError) {
          console.error("Error fetching active polls:", activeError);
          return;
        }

        // Fetch past polls
        const { data: expiredPolls, error: pastError } = await supabase
          .from("polls")
          .select(
            `
            id,
            question,
            expires_at,
            creator_name,
            created_by,
            votes (count)
          `
          )
          .lt("expires_at", now)
          .order("created_at", { ascending: false });

        if (pastError) {
          console.error("Error fetching past polls:", pastError);
          return;
        }

        setCurrentPolls(activePolls);
        setPastPolls(expiredPolls);
      } catch (error) {
        console.error("Unexpected error fetching polls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();

    // Set up real-time subscription
    const channel = supabase
      .channel("polls")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "polls",
        },
        fetchPolls
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
