import React, { useEffect, useState } from "react";
import NewPoll from "@/components/NewPoll";
import AllPolls from "@/components/AllPolls";
import ErrorMessage from "@/components/ErrorMessage";
import { PollProps } from "@/helpers";
import { createClient } from "@/utils/supabase/component";
import { User } from "@supabase/supabase-js";

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [polls, setPolls] = useState<PollProps[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null);
        if (!session?.user) {
          setLoading(false);
        }
      });

      return () => {
        data.subscription.unsubscribe();
      };
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchPolls = async () => {
      try {
        const { data, error } = await supabase
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
          .eq("created_by", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching polls:", error);
          return;
        }

        setPolls(data || []);
      } catch (error) {
        console.error("Unexpected error fetching polls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();

    // Set up real-time subscription
    const channel = supabase
      .channel(`polls_${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "polls",
          filter: `created_by=eq.${user.id}`,
        },
        fetchPolls
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

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
