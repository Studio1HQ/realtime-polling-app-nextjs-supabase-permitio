import { useRouter } from "next/router";
import React from "react";

const ManageButton = ({ closeDropdown }: { closeDropdown: () => void }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/polls/manage");
    closeDropdown();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 p-2 text-gray-800 rounded-md font-semibold">
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
        className="lucide lucide-vote">
        <path d="m9 12 2 2 4-4" />
        <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
        <path d="M22 19H2" />
      </svg>
      Manage Polls
    </button>
  );
};

export default ManageButton;
