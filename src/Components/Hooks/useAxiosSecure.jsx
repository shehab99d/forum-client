import axios from 'axios';

const axiosSecure = axios.create({
    
    baseURL: 'https://forum-serve.vercel.app',
    // baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosSecure.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ hook বানানো হল
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
