import axios from "axios";
import { getToken, removeToken } from "../utils/auth";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});


// Add JWT to every request
apiClient.interceptors.request.use(
    (config) => {

        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Handle common API errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {

        if (!error.response) {
            console.error("Network error: Backend may be unavailable.");
            return Promise.reject(error);
        }

        const status = error.response.status;

        if (status === 401) {

            console.error("Unauthorized: Login required.");

            removeToken();

            window.location.href = "/login";
        }

        if (status === 403) {
            console.error("Forbidden: You do not have permission.");
        }

        if (status === 404) {
            console.error("Resource not found.");
        }

        if (status >= 500) {
            console.error("Server error.");
        }

        return Promise.reject(error);
    }
);

export default apiClient;