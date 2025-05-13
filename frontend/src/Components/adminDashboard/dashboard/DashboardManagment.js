import axiosInstance from "../../../Hooks/TokenInterceptor";

export const sinistrePerMonth = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/sinistre/sinistres/per-month"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const sinistreTable = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/sinistre/sinistres/accepted"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const reclamationTable = async (status) => {
  try {
    const response = await axiosInstance.get(
      `/api/reclamation/getreclamation/status/${status}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reclamation by status:", error);
    throw error;
  }
};

export const sinistreDistribution = async () => {
  try {
    const response = await axiosInstance.get("/api/sinistre/sinistres");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const totalUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/user/count");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const acceptedSinistre = async () => {
  try {
    const response = await axiosInstance.get("/api/sinistre/count/accepted");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const pendingSinistre = async () => {
  try {
    const response = await axiosInstance.get("/api/sinistre/count/pending");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
