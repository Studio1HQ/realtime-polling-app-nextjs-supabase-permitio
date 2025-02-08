import React, { useEffect, useState } from "react";
import {
  calculateTotalVotes,
  ViewPollProps,
  getCountdown,
  dummyData,
} from "@/helpers";
import { User } from "@supabase/supabase-js";

const ViewPoll = () => {
  const [poll, setPoll] = useState<ViewPollProps | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [pollLoading, setPollLoading] = useState(true);
  const [voteLoading, setVoteLoading] = useState(true);
  const [canVote, setCanVote] = useState(false);
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    // Fetch poll
    setPollLoading(false);
    setVoteLoading(false);
    setPoll(dummyData[0]);
  }, []);

  if (!poll || pollLoading || voteLoading) return <div>Loading...</div>;

  const totalVotes = calculateTotalVotes(poll.options);
  const countdown = getCountdown(poll.expires_at);

  return (
    <div className="max-w-screen-sm">
      <h3 className="text-2xl font-bold">{poll.question}</h3>
      <p>Creator: @{poll?.creator_name}</p>
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
                  onClick={() => console.log(option.id)}
                  disabled={!user || hasExpired || !canVote}
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
              <div
                className="absolute inset-0 bg-gray-400 transition-all duration-300"
                style={{ width: `${percentage}%` }}></div>

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

      {user && !canVote && (
        <p className="mt-4 text-gray-600">You cannot vote on your own poll</p>
      )}
      {user && hasExpired && (
        <p className="mt-4 text-gray-600">
          This poll has expired and no longer accepts votes
        </p>
      )}
    </div>
  );
};

export default ViewPoll;
