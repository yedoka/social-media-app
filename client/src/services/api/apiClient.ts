import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
