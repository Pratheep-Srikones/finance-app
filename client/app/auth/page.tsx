"use client";

import BorderButton from "@/components/ui/border-button";
import { notifyError, notifySuccess } from "../../utils/notify";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { login, signup, uploadImage } from "@/services/auth.services";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      router.push("/dashboard");
    }
  }, [router]);
  const [mode, setMode] = useState<string>("login");

  const handleModeChange = (mode: string) => {
    setMode(mode);
  };
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleLogin = () => {
    if (!username) {
      notifyError("Username is required");
      return;
    }
    if (!password) {
      notifyError("Password is required");
      return;
    }
    login(username, password)
      .then(() => {
        notifySuccess("Login Successful");
        router.push("/dashboard");
      })
      .catch((err) => {
        notifyError("Login Failed: " + err.response.data.error.error.message);
      });
  };

  const handleSignup = () => {
    if (!username) {
      notifyError("Username is required");
      return;
    }
    if (!email) {
      notifyError("Email is required");
      return;
    }
    if (!password) {
      notifyError("Password is required");
      return;
    }
    signup(username, email, password, imgUrl)
      .then((res) => {
        notifySuccess("Signup Successful");
        console.log(res);
      })
      .catch((err) => {
        notifyError("Signup Failed: " + err.response.data.error.error.message);
      });
  };

  const handleUploadImage = (image: File) => {
    if (image) {
      uploadImage(image)
        .then((res) => {
          notifySuccess("Image Uploaded ");
          //console.log(res);
          setImgUrl(res.result.secure_url);
          setModalOpen(false);
        })
        .catch((err) => {
          notifyError("Image Upload Failed" + err);
        });
    }
  };

  const handleFile = (file: File) => {
    setImage(file);
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-black to-blue-950">
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
            <div className="flex flex-col mt-5 h-screen">
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
            <div className="flex flex-col mt-5 h-full">
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
              <div className="flex justify-center gap-4 mt-10">
                <button
                  className="w-full max-w-[200px] bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform duration-300"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
                <button
                  className="w-full max-w-[200px] bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform duration-300"
                  onClick={() => setModalOpen(true)}
                >
                  Upload Profile Picture
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {modalOpen && (
        <div className="bg-black/90 fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
          <div className="bg-gray-700 p-4 rounded-xl">
            <h1 className="text-xl font-bold text-white">Upload Image</h1>
            <div
              className={`mt-4 p-4 border-2 ${
                isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
              } rounded-lg flex flex-col items-center justify-center`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <p className="text-white mb-2">Drag and drop your image here</p>
              <p className="text-gray-500">or</p>
              <label
                htmlFor="fileInput"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
              >
                Select File
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
            <div>
              <button
                className="mr-4 bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-10 max-w-[200px]"
                onClick={() => handleUploadImage(image!)}
              >
                Upload
              </button>
              <button
                className=" mx-4 bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 mt-10 max-w-[200px]"
                onClick={() => {
                  setModalOpen(false);
                  setImage(null);
                  setPreview(null);
                }}
              >
                Cancel
              </button>
            </div>
            {preview && (
              <div className="mt-4">
                <p className="text-gray-700">Preview:</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover mt-2 border rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AuthPage;
