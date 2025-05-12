import axiosInstance from "../../../Hooks/TokenInterceptor";

export const userManagement = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/user/userid/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const userTableManagement = async () => {
  try {
    const response = await axiosInstance.get("/api/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
