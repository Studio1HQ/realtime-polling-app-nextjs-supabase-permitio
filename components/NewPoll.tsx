import React from "react";

const NewPoll = () => {
  return (
    <section>
      <button
        type="button"
        className="flex items-center gap-2 p-2 text-gray-800 rounded-md font-semibold"
        title="Create Poll">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-circle-plus">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
        New
      </button>
    </section>
  );
};

export default NewPoll;
