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
    try {
      await Keychain.setInternetCredentials(
        serviceName,
        accessToken,
        refreshToken,
      );

      return true;
    } catch (error) {
      return false;
    }
  },
  removeLocalAccessTokenAndRefreshToken: serviceName => {
    console.log("DA VO DAY VA XOA")
    return Keychain.resetInternetCredentials(serviceName);
  },
};

export default tokenService;
