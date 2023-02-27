import * as Keychain from 'react-native-keychain';

const tokenService = {
  getLocalAccessToken: async serviceName => {
    try {
      const credentials = await Keychain.getInternetCredentials(serviceName);
      if (credentials) {
        return credentials.username;
      } else {
        console.log('[getLocalAccessToken] No credentials stored');
        return null;
      }
    } catch (error) {
      console.log(
        "[getLocalAccessToken] Keychain couldn't be accessed!",
        error,
      );
      return null;
    }
  },
  getLocalRefreshToken: async serviceName => {
    try {
      const credentials = await Keychain.getInternetCredentials(serviceName);
      if (credentials) {
        return credentials.password;
      } else {
        console.log('[getLocalRefreshToken] No credentials stored');
        return null;
      }
    } catch (error) {
      console.log(
        "[getLocalRefreshToken] Keychain couldn't be accessed!",
        error,
      );
      return null;
    }
  },
  updateLocalAccessTokenAndRefreshToken: async (
    serviceName,
    accessToken,
    refreshToken,
  ) => {
    await Keychain.setInternetCredentials(
      serviceName,
      accessToken,
      refreshToken,
    )
      .then(() => {
        console.log('Lưu acccess token và refresh token thành công.');
        return true;
      })
      .catch(err => {
        console.log(`Lưu access token và refresh token thất bại >> ${err}`);
        return false;
      });
  },
  removeLocalAccessTokenAndRefreshToken: async serviceName => {
    await Keychain.resetInternetCredentials(serviceName)
      .then(() => {
        console.log('Xóa access token và refresh token thành công.');
        return true;
      })
      .catch(err => {
        console.log(
          `Xóa access token và refresh token không thành công >> ${err}`,
        );
        return false;
      });
  },
};

export default tokenService;
