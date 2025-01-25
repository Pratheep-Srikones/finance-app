import axiosInstance from "@/config/axios.config";

export const uploadImage = async (image: File) => {
  if (image) {
    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const signup = async (
  username: string,
  email: string,
  password: string,
  picture_link: string
) => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      username,
      email,
      password,
      picture_link,
    });

    return response.data.result;
  } catch (error) {
    throw error;
  }
};
