import { getCountdown, PollProps } from "@/helpers";
import Link from "next/link";
import React from "react";

const PollCard = ({ poll }: { poll: PollProps }) => {
  const countdown = getCountdown(poll.expires_at);

  return (
    <Link
      href={`/polls/${poll.id}`}
      className="p-4 bg-white rounded-md shadow-md border border-gray-200 hover:scale-105 transition-transform">
      <h3 className="text-xl font-bold">{poll.question}</h3>

      <p className="font-[family-name:var(--font-geist-mono)] text-sm text-gray-400 mt-4">
        {poll?.votes[0]?.count} votes . {countdown}
      </p>
    </Link>
  );
};

export default PollCard;
