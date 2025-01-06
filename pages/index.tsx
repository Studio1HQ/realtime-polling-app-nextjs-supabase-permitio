import AllPolls from "@/components/AllPolls";
import { PollProps } from "@/helpers";
import { createClient } from "@/utils/supabase/component";
import { useEffect, useState } from "react";

export default function Home() {
  const supabase = createClient();

  const [polls, setPolls] = useState<PollProps[]>([]);
  const [pastPolls, setPastPolls] = useState<PollProps[]>([]);
  const [loading, setLoading] = useState(true);

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
            votes (count)
          `
          )
          .eq("active", true)
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
            votes (count)
          `
          )
          .eq("active", true)
          .lt("expires_at", now)
          .order("created_at", { ascending: false });

        if (pastError) {
          console.error("Error fetching past polls:", pastError);
          return;
        }

        setPolls(activePolls);
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

      <AllPolls title="Active Polls" polls={polls} />
      <AllPolls title="Past Polls" polls={pastPolls} />
    </main>
  );
}
