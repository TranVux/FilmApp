import axios from 'axios';
const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    // baseURL: 'https://server-film-app.vercel.app/api',
    baseURL: 'http://192.168.1.19:3000/api',
  });
  axiosInstance.interceptors.request.use(
    async config => {
      config.headers = {
        Accept: 'application/json',
        'Content-Type': contentType,
      };
      // console.log(config);
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
