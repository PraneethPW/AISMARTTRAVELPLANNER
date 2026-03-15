import axios from "axios";

const API = axios.create({
  baseURL: "https://aismarttravelplanner-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json"
  }
});

/* Attach JWT token */
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

/* Handle expired token */
API.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      console.warn("Unauthorized. Logging out.");

      localStorage.removeItem("token");

      window.location.href = "/login";

    }

    return Promise.reject(error);

  }

);

export default API;