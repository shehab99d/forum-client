import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://forum-serve.vercel.app`
})
// console.log(axiosInstance.defaults.baseURL);

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;