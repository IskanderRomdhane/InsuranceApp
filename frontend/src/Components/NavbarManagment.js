import axiosInstance from "../Hooks/TokenInterceptor";

export const fetchUserNotifications = async (userEmail) => {
  try {
    const response = await axiosInstance.get(
      `/api/notifications/user/${userEmail}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    await axiosInstance.put(`/api/notifications/${id}/read`);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

export const retrievePfp = async () => {
  try{
    const userId = localStorage.getItem("userId");
    const response = await axiosInstance.get(`/api/user/getprofilpictureurl/${userId}`)
    return response;
  }catch(error){
    console.error("Error marking notification as read:", error);
    throw error;
  }
}
