import httpRequest from '../utils/httpRequest';

const authService = {
  getToken: (email, password, role_name) => {
    const url = 'api/auth/token/';

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
  convertToken: () => {},
  revokToken: () => {
    // Remove access token va refresh token tai day
  },
  jobSeekerRegister: () => {
    // Ket qua tra ve cua dang ky tai khoang nguoi tim viec
  },
  employerRegister: () => {
    // Ket qua tra ve cua dang ky tai khoang nha tuyen dung
  },
  getUserInfo: () => {
    const url = 'api/auth/user-info/';

    return httpRequest.get(url);
  },
};

export default authService;
