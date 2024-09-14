import { UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "../modal";
import SignInForm from "../../../modules/auth/sign-in";
import SignUpForm from "../../../modules/auth/sign-up";

const Layout = ({ children }: { children: JSX.Element }) => {
  const isAuthorized = localStorage.getItem("access_token");
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold ">App Name</h1>
          <nav>
            {isAuthorized ? (
              <UserIcon className="h-6 w-6 text-gray-700" />
            ) : (
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

      <Modal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)}>
        <SignInForm />
      </Modal>

      <Modal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)}>
        <SignUpForm />
      </Modal>
    </div>
  );
};

export default Layout;
