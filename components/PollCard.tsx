import Link from "next/link";
import React from "react";

const PollCard = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/polls/${id}`}
      className="p-4 bg-white rounded-md shadow-md border border-gray-200 hover:scale-105 transition-transform">
      <h3 className="text-2xl font-bold">Poll Title</h3>
      <p className="text-gray-500">Poll Description</p>

      <p className="font-[family-name:var(--font-geist-mono)] text-sm text-gray-400 mt-4">
        320 votes . 1w left
      </p>
    </Link>
  );
};

export default PollCard;
