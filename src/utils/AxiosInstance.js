import axios from 'axios';
const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: 'https://lab-express-server.vercel.app/api/',
  });
  axiosInstance.interceptors.request.use(
    async config => {
      config.headers = {
        Accept: 'application/json',
        'Content-Type': contentType,
      };
      return config;
    },
    err => Promise.reject(err),
  );
  axiosInstance.interceptors.response.use(
    res => res.data,
    err => Promise.reject(err),
  ); // callback
  return axiosInstance;
};

export default AxiosInstance;
