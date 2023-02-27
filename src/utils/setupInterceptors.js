import httpRequest from './httpRequest';
import tokenService from '../services/tokenService';

const serviceName = 'MyJob';

const setup = (store) => {
  httpRequest.interceptors.request.use(
    config => {
      const accessToken = tokenService.getLocalAccessToken(serviceName);
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const {dispatch} = store;
  httpRequest.interceptors.response.user(
    response => {
      return response.data;
    },
    async error => {
      const originalConfig = err.config;

      if (originalConfig.url !== 'api/auth/token/' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post('/auth/refreshtoken', {
              grant_type: '',                                                                                                                                                                                                                
              client_id: '',
              client_secrect: '',
              refresh_token: tokenService.getLocalRefreshToken(serviceName),
            });

            const {accessToken} = rs.data.data;

            dispatch(refreshToken(accessToken));
            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(error);
    },
  );
};

export default setup;
