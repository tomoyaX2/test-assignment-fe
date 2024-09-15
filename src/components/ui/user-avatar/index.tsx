import { UserIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useAppDispatch } from "@store/index";
import { logout } from "@store/user/actions";
import { useNavigate } from "react-router-dom";
import { BASE_APP_PATH } from "@shared/constants";
import { useClickOutside } from "@shared/hooks/click-outside";

export const UserAvatar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useClickOutside(menuRef, () => {
    setMenuOpen(false);
  });

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout({}));
    setMenuOpen(false);
    navigate(BASE_APP_PATH);
  };

  const goToAccountSettings = () => {
    navigate(`app/account-settings`);
    setMenuOpen(false);
  };

  // const goToDashboard = () => {
  //   navigate(`app/dashboard`);
  // };

  return (
    <div className="mr-2">
      <button onClick={toggleMenu} className="flex items-center">
        <UserIcon className="h-6 w-6 text-gray-700" />
      </button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-8 mt-2 border border-gray-800 bg-gray-900 rounded-md shadow-lg z-10"
        >
          <div className="py-2 flex items-center justify-center flex-col">
            {/* <button
              onClick={goToDashboard}
              className="block px-4 py-2 text-sm  hover:bg-gray-800 w-full text-left"
            >
              Dashboard
            </button> */}
            <button
              onClick={goToAccountSettings}
              className="block px-4 py-2 text-sm  hover:bg-gray-800 w-full text-left"
            >
              Account settings
            </button>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm  hover:bg-gray-800 w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
