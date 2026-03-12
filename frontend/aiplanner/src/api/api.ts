import axios from "axios";

const API = axios.create({
  baseURL: "https://aismarttravelplanner-production.up.railway.app/api"
});

export default API;