import axios from 'axios';
import queryString from 'query-string';
import tokenService from '../services/tokenService';
import {APP_NAME} from '../configs/constants';
import {AUTH_CONFIG} from '../configs/constants';

const httpRequest = axios.create({
  // baseURL: 'https://bkhuy-myjob.onrender.com/',
  // baseURL: 'https://bkhuy.pythonanywhere.com/',
  // baseURL: 'https://bkhuy-myjob-api.up.railway.app/',
  baseURL: 'http://192.168.43.26:8000/',
  // timeout: 5000,
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
    console.log('VO LOI');
    const originalConfig = error.config;

    if (originalConfig.url !== 'api/auth/token/' && error.response) {
      // Access Token was expired
      if (error.response.status === 401) {
        const refreshTokenLocal = await tokenService.getLocalRefreshToken(
          APP_NAME,
        );

        if (!refreshTokenLocal) {
          console.log('---> Không còn REFRESH TOKEN.');
          await tokenService.removeLocalAccessTokenAndRefreshToken(APP_NAME);
          return Promise.reject(error);
        }

        try {
          console.log(
            '---> Còn REFRESH TOKEN ---> LẤY TOKEN MỚI --> Refresh token là: ',
            refreshTokenLocal,
          );
          // here
          // await tokenService.removeLocalAccessTokenAndRefreshToken(APP_NAME);
          const resData = await httpRequest.post('api/auth/token/', {
            grant_type: AUTH_CONFIG.REFRESH_TOKEN_KEY,
            client_id: AUTH_CONFIG.CLIENT_ID,
            client_secret: AUTH_CONFIG.CLIENT_SECRECT,
            refresh_token: refreshTokenLocal,
          });

          const {access_token: accessToken, refresh_token: refreshToken} =
            resData.data;
          console.log('Token mới: ', accessToken);
          console.log('Refresh token token mới: ', refreshToken);

          // dispatch(refreshToken(accessToken));
          // TokenService.updateLocalAccessToken(accessToken);

          return axiosInstance(originalConfig);
        } catch (_error) {
          if (_error.response.status === 401) {
            console.log('---> REFRESH TOKEN CŨNG HẾT HẠN.');
            await tokenService.removeLocalAccessTokenAndRefreshToken(APP_NAME);
            return Promise.reject(error);
          } else {
            return Promise.reject(_error);
          }
        }
      }
    }

    return Promise.reject(error);
  },
);

export default httpRequest;
