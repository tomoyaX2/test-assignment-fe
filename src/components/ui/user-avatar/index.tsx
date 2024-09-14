import { UserIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../../store";
import { logout } from "../../../store/user/actions";

export const UserAvatar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  return (
    <div>
      <button onClick={toggleMenu} className="flex items-center">
        <UserIcon className="h-6 w-6 text-gray-700" />
      </button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 border border-gray-300 rounded-md shadow-lg z-10"
        >
          <div className="py-2">
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
