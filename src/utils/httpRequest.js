import axios from 'axios';
import queryString from 'query-string';

const httpRequest = axios.create({
  baseURL: 'http://192.168.1.5:8000/',
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

export default httpRequest;
