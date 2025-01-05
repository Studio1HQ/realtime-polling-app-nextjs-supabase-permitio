import { useRouter } from "next/router";
import React from "react";

const ViewPoll = () => {
  const { query } = useRouter();
  const options = [
    { name: "Option 1", votes: 30 },
    { name: "Option 2", votes: 70 },
  ];

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div>
      <h3 className="text-2xl font-bold">{query.id}</h3>
      <p className="text-gray-500">Poll Description</p>
      <p className="font-[family-name:var(--font-geist-mono)] text-sm text-gray-400 mt-4">
        320 votes . 1w left
      </p>

      <ul className="border-t border-gray-200 mt-4 pt-4 space-y-4 max-w-screen-sm">
        {options.map(option => {
          const percentage =
            totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

          return (
            <li
              key={option.name}
              className="relative bg-slate-100 rounded-md p-2 overflow-hidden">
              {/* Background bar */}
              <div
                className="absolute inset-0 bg-gray-400 transition-all duration-300"
                style={{ width: `${percentage}%` }}></div>

              {/* Content */}
              <div className="relative flex items-center justify-between z-10">
                <span className="flex items-center gap-2">
                  {option.name}{" "}
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
                {percentage.toFixed(0)}%
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ViewPoll;
