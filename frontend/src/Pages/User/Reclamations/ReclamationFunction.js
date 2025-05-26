import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../../Hooks/TokenInterceptor';
import { useParams } from 'react-router-dom';
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

export const fetchClaimsByEmail = async (filter = null) => {
  try {
    const email = getEmailFromToken();
    const userId = localStorage.getItem("userId");
    if (!email) {
      throw new Error("Missing email.");
    }

    let response;

    if (!filter || filter === 'ALL') {
      response = await axiosInstance.get(`/api/reclamation/getrelamations/${email}`);
    } else {
      const request = {
        userEmail: email,
        status: filter,
        description: "",
        typeReclamation: ""
      };
      console.log(request)
      response = await axiosInstance.get(`/api/reclamation/getuserreclamation`, {
        params : {
          userEmail: email,
        status: filter,
        }}
      );
    }

    return response.data;
  } catch (err) {
    console.error("Failed to fetch claims:", err);
    throw err;
  }
};



import axios from 'axios';
import { Axe } from 'lucide-react';

export const submitReclamation = async (formData, email) => {
  try {
    // Create a ReclamationDTO object
    const reclamationDTO = {
      userEmail: email,
      typeReclamation: formData.typeReclamation,
      description: formData.description,
      sinistreId: formData.sinistreId || null
    };

    // Convert ReclamationDTO to JSON string
    const reclamationJson = JSON.stringify(reclamationDTO);

    // Create FormData object for multipart/form-data request
    const requestFormData = new FormData();
    
    // Add the JSON string as a 'reclamation' parameter
    requestFormData.append('reclamation', reclamationJson);
    
    // Add the file if it exists
    if (formData.file) {
      requestFormData.append('file', formData.file);
    } else {
      // If no file, append an empty blob to avoid missing parameter error
      // Only do this if your backend requires the file parameter to be present
      // Remove this if your backend allows the file to be optional
      // requestFormData.append('file', new Blob([]));
    }

    // Send the request to the backend
    const response = await axiosInstance.post(
      'http://localhost:8081/api/reclamation/CreerReclamation',
      requestFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error submitting reclamation:', error);
    throw error;
  }
};
