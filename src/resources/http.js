import axios from "axios";

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {},
    // withCredentials: true,
})

try {
    http.interceptors.request.use(
        config => {
            let data = JSON.parse(localStorage.getItem("keeper"));

            if (data && data.auth.token) {
                config.headers["Authorization"] = 'Token ' + data.auth.token;
            }

            return config;
        },
        
        error => {
            return Promise.reject(error);
        }
    );
} catch (error) {
    console.log(error);
}

export default http;