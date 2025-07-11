// // src/utils/axiosSecure.js
// import axios from 'axios';

// const useAxiosSecure = axios.create({
//     baseURL: 'http://localhost:5000/',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// useAxiosSecure.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );


// useAxiosSecure.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default useAxiosSecure;


// src/Hooks/useAxiosSecure.js
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/',
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
