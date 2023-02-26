import httpRequest from '../utils/httpRequest';

const authService = {
  getAccessToken: (email, password, role_name) => {
    const url = 'auth/token/';

    var formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('client_id', 'FIrMIsfKbI6jw7EnAof2QnPpM7dxTkmSLvIhwckm');
    formData.append(
      'client_secret',
      'mgpjePa9iCtswbzO9EYbpedlL6bY8tYfq604XW3T3WkNTwmMnGQ8RHogRAD8bRPupuCmqFV4UZJnHvn9tfyCi0kP4p8fviGVa6TLh74rq73pIERfw90PGfLgKj1Htnok',
    );
    formData.append('username', email);
    formData.append('password', password);
    formData.append('role_name', role_name);

    return httpRequest.post(url, formData);
  },
  refreshAccessToken: () => {
    console.log('REFRESH TOKEN');
  },
  getCurrentUser: () => {
    console.log('GET CURRENT USER');
  },
};

export default authService;
