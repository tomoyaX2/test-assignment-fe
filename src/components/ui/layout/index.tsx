import { useState } from "react";
import SignInForm from "../../../modules/auth/sign-in";
import SignUpForm from "../../../modules/auth/sign-up";
import { useAppSelector } from "../../../store";
import { UserAvatar } from "../user-avatar";
import { useNavigate } from "react-router-dom";
import { BASE_APP_PATH } from "../../../shared/constants";

const Layout = ({ children }: { children: JSX.Element }) => {
  const isAuthorized = useAppSelector((state) => state.user.user);
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate(BASE_APP_PATH)}
          >
            App Name
          </h1>
          <nav>
            {isAuthorized ? (
              <UserAvatar />
            ) : (
              <>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSignInOpen(true)}
                    className="mr-4 font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setSignUpOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Sign Up
                  </button>
                </div>
                {isSignInOpen && <SignInForm setSignInOpen={setSignInOpen} />}
                {isSignUpOpen && (
                  <SignUpForm
                    closeModal={() => {
                      setSignUpOpen(false);
                    }}
                  />
                )}
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow mx-auto px-4 py-8 flex items-center justify-center">
        {children}
      </main>

      <footer className="border-t border-gray-200">
        <div className="mx-auto px-4 py-4 text-center">
          <p className="">
            &copy; {new Date().getFullYear()} App Name. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
