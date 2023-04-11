import axios from 'axios';
import queryString from 'query-string';
import tokenService from '../services/tokenService';
import {APP_NAME} from '../configs/constants';

const httpRequest = axios.create({
  baseURL: 'http://192.168.43.26:8000/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: params => {
      return queryString.stringify(params, {arrayFormat: 'bracket'});
    },
  },
});

httpRequest.interceptors.request.use(
  async config => {
    const accessToken = await tokenService.getLocalAccessToken(APP_NAME);
    if (accessToken && config.url !== 'api/auth/token/') {
      console.log('LAY ACCESS TOKEN DE CALL API: ', accessToken);
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

httpRequest.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    const originalConfig = error.config;

    if (originalConfig.url !== 'api/auth/token/' && error.response) {
      // Access Token was expired
      if (error.response.status === 401) {
        const refreshTokenLocal = await tokenService.getLocalRefreshToken(
          APP_NAME,
        );

        if (!refreshTokenLocal) {
          console.log('HET PHIEN DANG NHAP');
          return Promise.reject(error);
        }
        console.log(
          'LAY REFRESH TOKEN DỂ LẤY ACCESS TOKEN: ',
          refreshTokenLocal,
        );

        try {
          console.log('CHUA HET PHIEN DANG NHAP -> REFRESH TOKEN');
          const resData = await httpRequest.post('api/auth/token/', {
            grant_type: 'refresh_token',
            client_id: 'FIrMIsfKbI6jw7EnAof2QnPpM7dxTkmSLvIhwckm',
            client_secret:
              'mgpjePa9iCtswbzO9EYbpedlL6bY8tYfq604XW3T3WkNTwmMnGQ8RHogRAD8bRPupuCmqFV4UZJnHvn9tfyCi0kP4p8fviGVa6TLh74rq73pIERfw90PGfLgKj1Htnok',
            refresh_token: refreshTokenLocal,
          });

          const {access_token: accessToken, refresh_token: refreshToken} =
            resData.data;

          console.log('TOKEN NEW: ', accessToken);
          console.log('REFRESH NEW: ', refreshToken);

          // dispatch(refreshToken(accessToken));
          // TokenService.updateLocalAccessToken(accessToken);

          // return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default httpRequest;
