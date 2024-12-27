"use client";

import BorderButton from "@/components/ui/border-button";
import { notifySuccess } from "../../utils/notify";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const AuthPage = () => {
  const [mode, setMode] = useState<string>("login");

  const handleModeChange = (mode: string) => {
    setMode(mode);
  };
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    notifySuccess("Login Successful");
  };

  const handleSignup = () => {
    notifySuccess("Signup Successful");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-black to-blue-950">
      <div className="flex flex-col justify-center bg-black/25 z-10 p-8 rounded-xl shadow-xl gap-8 w-72 md:w-96 lg:w-[28rem]">
        {/* Buttons Section */}
        <div className="flex flex-row gap-6 items-center justify-center">
          <BorderButton
            text="Login"
            onClick={() => handleModeChange("login")}
          />
          <BorderButton
            text="Signup"
            onClick={() => handleModeChange("signup")}
          />
        </div>

        {/* Conditional Text Section */}
        <div className="text-center text-white text-lg">
          {mode === "login" && (
            <div className="flex flex-col mt-5">
              <h1 className="text-3xl font-bold mx-2 text-left">Login</h1>
              <span className="bg-blue-500 h-[10px] w-16 sm:w-20 lg:w-24 block mt-2 rounded-2xl"></span>
              <div className="my-8 text-left">
                <span className="font-bold">Username:</span>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-600 bg-transparent text-white p-2 focus:outline-none focus:border-blue-500 max-w-[300px]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="mb-6 text-left">
                <span className="font-bold">Password:</span>
                <input
                  type="password"
                  className="w-full border-b-2 border-gray-600 bg-transparent text-white p-2 focus:outline-none focus:border-blue-500 max-w-[300px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-950 transition duration-300 hover:underline mt-10 max-w-[200px]"
                onClick={handleLogin}
              >
                LOG IN
              </button>
            </div>
          )}
          {mode === "signup" && (
            <div className="flex flex-col mt-5">
              <h1 className="text-3xl font-bold mx-2 text-left">SignUp</h1>
              <span className="bg-blue-500 h-[10px] w-16 sm:w-20 lg:w-24 block mt-2 rounded-2xl"></span>
              <div className="my-8 text-left">
                <label htmlFor="username" className="font-bold block mb-2">
                  Username:
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-600 bg-transparent text-white p-2 focus:outline-none focus:border-blue-500 max-w-[300px]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="my-8 text-left">
                <label htmlFor="email" className="font-bold block mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  className="w-full border-b-2 border-gray-600 bg-transparent text-white p-2 focus:outline-none focus:border-blue-500 max-w-[300px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="mb-6 text-left">
                <label htmlFor="password" className="font-bold block mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  className="w-full border-b-2 border-gray-600 bg-transparent text-white p-2 focus:outline-none focus:border-blue-500 max-w-[300px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-950 transition duration-300 hover:underline mt-10 max-w-[200px]"
                onClick={handleSignup}
              >
                SIGN UP
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthPage;
