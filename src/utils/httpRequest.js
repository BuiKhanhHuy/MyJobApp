import axios from 'axios';
import queryString from 'query-string';

const httpRequest = axios.create({
  baseURL: 'http://192.168.1.5:8000/api/',
  timeout: 5000,
  headers: {
    Authorization: '',
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
  paramsSerializer: {
    encode: params => {
      return queryString.stringify(params, {arrayFormat: 'brackets'});
    },
  },
});

httpRequest.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

httpRequest.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log(originalRequest._retry)
    if (error.response.status === 400 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return httpRequest(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default httpRequest;
