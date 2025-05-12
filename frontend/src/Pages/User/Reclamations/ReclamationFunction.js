import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../../Hooks/TokenInterceptor';
export const getEmailFromToken = () => {
  try {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.email;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
  }
  return null;
};

export const fetchClaimsByEmail = async () => {
  try {
    const email = getEmailFromToken();
    if (!email) {
      throw new Error("Missing email.");
    }
    const response = await axiosInstance.get(`/api/reclamation/getrelamations/${email}`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch claims:", err);
    throw err;
  }
};

export const submitReclamation = async (formData, email) => {
  try {
    const formDataToSubmit = new FormData();

    // Append file if exists
    if (formData.file) {
      formDataToSubmit.append('file', formData.file);
    }

    // Prepare claim data
    const claimData = {
      userEmail: email,
      typeReclamation: formData.typeReclamation,
      description: formData.description
    };

    // Append claim data as JSON string
    formDataToSubmit.append('claim', JSON.stringify(claimData));

    // Use axiosInstance for consistent request handling
    const response = await axiosInstance.post('/api/reclamation/CreerReclamation', formDataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error("Failed to submit reclamation:", error);
    throw error;
  }
};
