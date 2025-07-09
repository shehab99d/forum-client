// src/utils/axiosSecure.js
import axios from 'axios';

const useAxiosSecure = axios.create({
    baseURL: 'http://localhost:5000/', // তোমার backend url
    headers: {
        'Content-Type': 'application/json',
    },
});

// request interceptor - প্রতি request এর আগে টোকেন attach করবে
useAxiosSecure.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Firebase থেকে সেট করা টোকেন
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: response interceptor - error handle করতে পারো এখানে
useAxiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
        // যেমন token expired হলে লগ আউট বা রিফ্রেশ টোকেন লজিক দিতে পারো
        return Promise.reject(error);
    }
);

export default useAxiosSecure;
