import { calculateTotalVotes, ViewPollProps, getCountdown } from "@/helpers";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/component";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const ViewPoll = () => {
  const { query } = useRouter();
  const supabase = createClient();

  const [poll, setPoll] = useState<ViewPollProps | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [pollLoading, setPollLoading] = useState(true);
  const [voteLoading, setVoteLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const checkUserVote = async () => {
      const { data: votes } = await supabase
        .from("votes")
        .select("id")
        .eq("poll_id", query.id)
        .eq("user_id", user.id)
        .single();

      setHasVoted(!!votes);
      setVoteLoading(false);
    };

    const fetchPoll = async () => {
      const { data } = await supabase
        .from("polls")
        .select(
          `
          *,
          options (
            id,
            text,
            votes (count)
          )
        `
        )
        .eq("id", query.id)
        .single();

      setPoll(data);
      setPollLoading(false);

      checkUserVote();
    };

    fetchPoll();

    const channel = supabase
      .channel(`poll-${query.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "votes",
          filter: `poll_id=eq.${query.id}`,
        },
        () => {
          fetchPoll();
          checkUserVote();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [query.id, user]);

  const handleVote = async (optionId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("votes").insert({
        poll_id: query.id,
        option_id: optionId,
        user_id: user.id,
      });

      if (!error) {
        setHasVoted(true);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  if (!poll || pollLoading || voteLoading) return <div>Loading...</div>;

  const totalVotes = calculateTotalVotes(poll.options);
  const countdown = getCountdown(poll.expires_at);

  return (
    <div className="max-w-screen-sm">
      <h3 className="text-2xl font-bold">{poll.question}</h3>
      <p className="font-[family-name:var(--font-geist-mono)] text-sm text-gray-400 mt-4">
        {totalVotes} votes . {countdown}
      </p>

      <ul className="border-t border-gray-200 mt-4 pt-4 space-y-4">
        {poll.options.map(option => {
          const percentage =
            totalVotes > 0 ? (option.votes[0]?.count / totalVotes) * 100 : 0;

          if (!hasVoted) {
            // Pre-voting state
            return (
              <li key={option.id} className="border rounded-md border-gray-200">
                <button
                  onClick={() => handleVote(option.id)}
                  disabled={!user || poll.created_by === user?.id}
                  className="w-full text-left p-4 rounded-md hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {option.text}
                </button>
              </li>
            );
          }

          // Post-voting state
          return (
            <li
              key={option.id}
              className="relative bg-slate-100 rounded-md p-2 overflow-hidden">
              {/* Background bar */}
              <div
                className="absolute inset-0 bg-gray-400 transition-all duration-300"
                style={{ width: `${percentage}%` }}></div>

              {/* Content */}
              <div className="relative flex items-center justify-between z-10 flex-wrap gap-4">
                <span className="flex items-center gap-2">
                  {option.text}{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-check">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <span>
                  {option.votes[0].count} votes - {percentage.toFixed(0)}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {user && poll.created_by === user.id && (
        <p className="mt-4 text-gray-600">You cannot vote on your own poll</p>
      )}
    </div>
  );
};

export default ViewPoll;
