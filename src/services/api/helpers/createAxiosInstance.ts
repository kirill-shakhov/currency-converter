import axios from 'axios';

export function createAxiosInstance() {
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL,
    });
}



