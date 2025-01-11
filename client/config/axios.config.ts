import axios from "axios";
//import config from "./config";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
