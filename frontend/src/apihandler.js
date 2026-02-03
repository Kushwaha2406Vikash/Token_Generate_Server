import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000" || import.meta.env.VITE_API_URL, // FastAPI backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
