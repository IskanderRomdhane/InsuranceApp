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
    const userId = getUserIDFromToken(); // Step 1: get user ID from token
    if (!userId) {
      throw new Error("User ID not found in token");
    }

    const response = await axiosInstance.get(
      `/api/sinistre/sante/getusersinistres/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user-specific Health sinistres:", error);
    throw error;
  }
};

export const getCarSinistres = async () => {
  try {
    const userId = getUserIDFromToken(); // Step 1: get user ID from token
    if (!userId) {
      throw new Error("User ID not found in token");
    }

    const response = await axiosInstance.get(
      `/api/sinistre/automobile/getusersinistres/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user-specific Car sinistres:", error);
    throw error;
  }
};

export const getHouseSinistres = async () => {
  try {
    const userId = getUserIDFromToken(); // Step 1: get user ID from token
    if (!userId) {
      throw new Error("User ID not found in token");
    }

    // Step 2: make API call using the userId
    const response = await axiosInstance.get(
      `/api/sinistre/habilitation/getusersinistres/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user-specific house sinistres:", error);
    throw error;
  }
};

// export const getUserIDFromToken = () => {
//   const accessToken = data.access_token;
//   const refreshToken = data.refresh_token;

//   let userId = "";
//   try {
//     const decoded = jwtDecode(accessToken);
//     userId = decoded.sub || null;
//     console.log(decoded);
//     return userId;
//     // if (token) {
//     //   const decoded = jwtDecode(token);
//     //   return decoded.sub;
//     // }
//   } catch (error) {
//     console.error("Error decoding token:", error);
//   }
//   return null;
// };

export const getUserIDFromToken = () => {
  try {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.sub;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  return null;
};
