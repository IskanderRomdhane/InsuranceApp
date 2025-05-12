import axiosInstance from "../../../Hooks/TokenInterceptor";

export const fetchSinistres = async () => {
  try {
    const response = await axiosInstance.get("/api/sinistre/sinistres");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const getusersrelamations = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/reclamation/getusersrelamations"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const getHealthSinistres = async () => {
  try {
    const response = await axiosInstance.get("/api/sinistre/sante");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const getCarSinistres = async () => {
  try {
    const response = await axiosInstance.get("/api/sinistre/automobile");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const getHouseSinistres = async () => {
  try {
    const response = await axiosInstance.get("/api/sinistre/habilitation");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
