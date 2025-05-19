import axiosInstance from "../../../Hooks/TokenInterceptor";
import { jwtDecode } from "jwt-decode";

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

export const getUserIDFromToken = () => {
  const accessToken = data.access_token;
  const refreshToken = data.refresh_token;

  let userId = "";
  try {
    const decoded = jwtDecode(accessToken);
    userId = decoded.sub || null;
    console.log(decoded);
    return userId;
    // if (token) {
    //   const decoded = jwtDecode(token);
    //   return decoded.sub;
    // }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  return null;
};
