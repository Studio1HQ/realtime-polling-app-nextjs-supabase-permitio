import { useState, useRef, useEffect } from "react";
import LogOutButton from "./LogOutButton";
import Image from "next/image";
import ManageButton from "./ManageButton";

function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center focus:outline-none">
        <Image
          src="/path-to-avatar.jpg"
          alt="User Avatar"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full border-2 border-gray-500"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-4 z-50">
          <div className="grid items-center gap-4">
            <ManageButton closeDropdown={closeDropdown} />
            <LogOutButton closeDropdown={closeDropdown} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
