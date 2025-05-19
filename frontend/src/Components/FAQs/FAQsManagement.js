import axiosInstance from "../../Hooks/TokenInterceptor";

export const fetchFaqs = async () => {
  try {
    const response = await axiosInstance.get("/api/faqs");
    return response.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw error;
  }
};

export const fetchDocuments = async () => {
  try {
    const response = await axiosInstance.get("/api/documents");
    return response.data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

export const fetchLexiques = async () => {
  try {
    const response = await axiosInstance.get("/api/glossary");
    return response.data;
  } catch (error) {
    console.error("Error fetching glossaries:", error);
    throw error;
  }
};
