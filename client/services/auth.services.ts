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

export const login = async (username: string, password: string) => {
  if (username && password) {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("username", user.username);
      localStorage.setItem("email", user.email);
      localStorage.setItem("picture_link", user.picture_link);
    } catch (error) {
      throw error;
    }
  }
};

export const changePassword = async (
  old_password: string,
  new_password: string
) => {
  if (old_password && new_password) {
    try {
      const response = await axiosInstance.post("/auth/password", {
        username: localStorage.getItem("username"),
        old_password,
        new_password,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
