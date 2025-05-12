import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../../Hooks/TokenInterceptor';

export const FetchSinistres = async (typeFiltre ,statutFiltre ) => {
      try {
        let url = "/api/sinistre/sinistres";

        if (typeFiltre !== "Tous") {
          url = `/api/sinistre/getsinistre/type/${typeFiltre}`;
        }

        if (statutFiltre !== "Tous" && typeFiltre === "Tous") {
          url = `/api/sinistre/getsinistre/statut/${statutFiltre}`;
        }
        const response =  await axiosInstance.get(url);
        const data = response.data;
        if (statutFiltre !== "Tous" && typeFiltre !== "Tous") {
          data = data.filter((sinistre) => sinistre.etat === statutFiltre);
        }
        console.log(data)
        return data ;

      } catch (err) {
        console.log(err)
      }
};

export const FetchSinistresDetails = async (id) => {
      try {
        const response = await axiosInstance.get(`/api/sinistre/getsinistre/id/${id}`);
        const data = response.data;
        console.log(data)
        return data ;
      } catch (err) {
        console.log(err)
      }
    };

export const CreerSinistre = async (formData, sinistreType) => {
  try {
    const response = await axiosInstance.post(
      `/api/sinistre/${sinistreType}/creersinistre`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data' // Changed to multipart/form-data for file uploads
        }
      }
    );
    return response;
  } catch (err) {
    console.error("Error creating sinistre:", err);
    throw err; // Re-throw the error to handle it in the calling function
  }
};