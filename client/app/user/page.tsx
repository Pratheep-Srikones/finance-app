/* eslint-disable @next/next/no-img-element */
"use client";

import { changePassword } from "@/services/auth.services";
import { User } from "@/types/types";
import { notifyError, notifySuccess } from "@/utils/notify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("user_id")) {
      router.push("/auth");
    }
  }, []);
  const [currUser, setCurrUser] = useState<User>({
    username: localStorage.getItem("username") || "Username not found",
    email: localStorage.getItem("email") || "Email not found",
    picture_link:
      localStorage.getItem("picture_link") ||
      "https://www.gravatar.com/avatar/",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("edit");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditModalOpen = () => {
    setAction("edit");
    setModalOpen(true);
  };
  const handlePWModalOpen = () => {
    setAction("changePW");
    setModalOpen(true);
  };

  const handleLogOut = () => {
    localStorage.clear();
    router.push("/auth");
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      notifyError("Passwords do not match");
      return;
    }
    try {
      changePassword(oldPassword, newPassword)
        .then((res) => {
          if (res) {
            notifySuccess("Password changed successfully");
            setModalOpen(false);
            setNewPassword("");
            setOldPassword("");
            setConfirmPassword("");
          }
        })
        .catch((error) => {
          notifyError("Error changing password: " + error.response.data.error);
          //console.error("Error changing password:", error);
        });
    } catch (error) {
      notifyError("Error changing password: " + error);
    }
  };
  return (
    <div className="flex h-screen bg-gray-800 flex-col items-center justify-center p-6">
      <div className="flex p-4 gap-6 flex-col md:flex-row bg-gray-700/30 m-4 border border-gray-600 rounded-xl items-center md:items-start shadow-md w-full max-w-4xl">
        <img
          src={currUser.picture_link}
          alt="Profile Image"
          width={128}
          height={128}
          className="rounded-full shadow-lg object-cover w-32 h-32 md:w-40 md:h-40"
        />

        {/* User Info */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-white">{currUser.username}</h1>
          <h2 className="text-lg text-gray-300 mt-2">{currUser.email}</h2>
          <p className="text-sm text-gray-400 mt-4">
            Welcome to your profile page! Update your information or check your
            account details here.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-4 items-center md:flex-row md:justify-start">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition w-full md:w-auto"
              onClick={handleEditModalOpen}
            >
              Edit Profile
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition w-full md:w-auto"
              onClick={handlePWModalOpen}
            >
              Change Password
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition w-full md:w-auto"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 overflow-y-auto ${
          !modalOpen && "hidden"
        }`}
      >
        <div className="flex bg-gray-800 flex-col rounded-xl items-center justify-center p-6">
          {action === "edit" && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
              <h1 className="text-2xl font-bold text-white mb-6 text-center md:text-left">
                Edit Profile
              </h1>

              {/* Username Field */}
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={currUser.username}
                  onChange={(e) => {
                    setCurrUser({ ...currUser, username: e.target.value });
                  }}
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={currUser.email}
                  onChange={(e) => {
                    setCurrUser({ ...currUser, email: e.target.value });
                  }}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition">
                  Submit
                </button>
                <button
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {action === "changePW" && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
              <h1 className="text-2xl font-bold text-white mb-6 text-center md:text-left">
                Change Password
              </h1>

              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Old Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <button
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                  onClick={() => {
                    handleChangePassword();
                  }}
                >
                  Submit
                </button>
                <button
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                  onClick={() => {
                    setModalOpen(false);
                    setNewPassword("");
                    setOldPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
