import { getCountdown, PollProps } from "@/helpers";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PollCard = ({ poll }: { poll: PollProps }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canManagePoll, setCanManagePoll] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const countdown = getCountdown(poll?.expires_at);
  // const votes = poll?.votes[0]?.count ? poll?.votes[0]?.count : 0;

  const handleEdit = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    // Add your edit logic here
    alert("Edited");
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    // Add your delete logic here
    alert("Deleted");
  };

  return (
    <Link
      href={`/polls/${poll?.id}`}
      className="p-4 bg-white rounded-md shadow-md border border-gray-200 hover:scale-105 transition-transform">
      <h3 className="text-xl font-bold">{poll?.question}</h3>
      <p>@{poll?.creator_name}</p>

      <p className="font-[family-name:var(--font-geist-mono)] text-sm text-gray-400 mt-4">
        {12} votes . {countdown}
      </p>

      {canManagePoll && (
        <div className="flex justify-start gap-4 mt-4">
          <button type="button" onClick={handleEdit}>
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
              className="lucide lucide-pencil">
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
          <button type="button" onClick={handleDelete}>
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
              className="lucide lucide-trash-2">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </button>
        </div>
      )}
    </Link>
  );
};

export default PollCard;
