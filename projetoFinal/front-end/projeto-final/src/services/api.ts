import axios from "axios";

const api = axios.create({
    baseURL: "https://app-projeto-final-backend.herokuapp.com",
});

export default api;
