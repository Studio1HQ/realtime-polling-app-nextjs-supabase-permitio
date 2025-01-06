import { calculateTotalVotes, getCountdown, PollProps } from "@/helpers";
import Link from "next/link";
import React from "react";

const PollCard = ({ poll }: { poll: PollProps }) => {
  const totalVotes = calculateTotalVotes(poll.options);
  const countdown = getCountdown(poll.expiresAt);
  
  return (
    <Link
      href={`/polls/${poll.id}`}
      className="p-4 bg-white rounded-md shadow-md border border-gray-200 hover:scale-105 transition-transform">
      <h3 className="text-xl font-bold">{poll.title}</h3>

      <p className="font-[family-name:var(--font-geist-mono)] text-sm text-gray-400 mt-4">
        {totalVotes} votes . {countdown}
      </p>
    </Link>
  );
};

export default PollCard;
