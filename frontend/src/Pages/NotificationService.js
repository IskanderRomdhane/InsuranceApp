import axiosInstance from "../Hooks/TokenInterceptor";

export const fetchUserNotification = async (userEmail) => {
  try {
    const response = await axiosInstance.get(
      `/api/notifications/user/${userEmail}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notification:", error);
    throw error;
  }
};
