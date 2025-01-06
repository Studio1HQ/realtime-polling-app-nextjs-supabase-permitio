import NewPoll from "@/components/NewPoll";
import AllPolls from "@/components/AllPolls";
import React, { useEffect, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { createClient } from "@/utils/supabase/component";
import { User } from "@supabase/supabase-js";
import { PollProps } from "@/helpers";

const Page = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [polls, setPolls] = useState<PollProps[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null);
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
            votes (count)
          `
          )
          .eq("active", true)
          .eq("created_by", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching polls:", error);
          return;
        }

        setPolls(data || []);
      } catch (error) {
        console.error("Unexpected error fetching polls:", error);
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
