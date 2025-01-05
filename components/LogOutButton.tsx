import React from "react";

const LogOutButton = ({ closeDropdown }: { closeDropdown: () => void }) => {
  const handleLogOut = () => {
    // Log out logic
    closeDropdown();
  };

  return (
    <button
      type="button"
      onClick={handleLogOut}
      className="flex items-center gap-2 p-2 bg-gray-800 text-white rounded-md">
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
        className="lucide lucide-log-out">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
      </svg>
      Log Out
    </button>
  );
};

export default LogOutButton;
