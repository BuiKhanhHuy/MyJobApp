import dayjs from 'dayjs';

const APP_NAME = 'MyJob';

const AUTH_PROVIDER = {
  FACEBOOK: 'facebook',
  GOOGLE: 'google-oauth2',
};

const AUTH_CONFIG = {
  // BACKEND
  CLIENT_ID: 'VYqeXWvCcINnPhStYBKg3HJC5BeJqCZaohYlyROz',
  CLIENT_SECRECT:
    'Buz6z6vwxy8W5QCVlxqCyfDnhFDDsGgf7N9B2lApShX1nj9hiFGyT8stTo6hSxn3ph2MttFPPfwWLUlwpaYaOjxvCjoYABdoq23EBoe5pMhF5zlUhUolwVdgQ7nuDtYG',
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  PASSWORD_KEY: 'password',
  CONVERT_TOKEN_KEY: 'convert_token',

  // FACEBOOK AUTH
  FACEBOOK_CLIENT_ID: '503591871851468',
  FACEBOOK_CLIENT_SECRET: '87054023f865721b313376d492bb4c04',

  // GOOGLE AUTH
  GOOGLE_CLIENT_ID:
    '717983009047-l046emjuhge9p8s9rqs4p7j9idsrnsb9.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: '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',

  // GOONG
  GOONGAPI_KEY: 'UMRiT4CiOH9UU9Ju9L1YJLSYZM5EQberRoSsyfDW',
  GOONGAPI_ACCESS_TOKEN: 'q2ehn14wfdLdZkDXejl5d1X6pBxZf0ssca6jrEOo',

  // BING MAP
  BING_MAPS_KEY:
    'Av0DmLVNRE8m7HZGSTySLkyPaLX3Gg3b3cdt7I0ArXWxSmtKwqCpsUW6OE21t2z2',
};

const ROLES_NAME = {
  ADMIN: 'ADMIN',
  EMPLOYER: 'EMPLOYER',
  JOB_SEEKER: 'JOB_SEEKER',
};

const HOME_FILTER_CAREER = [
  {
    id: 37,
    name: 'IT - Phần mềm',
  },
  {
    id: 38,
    name: 'IT - Phần cứng',
  },
];

const SEARCH_TYPE_WITH_KEYWORD = {
  JOB_POST_SEARCH: 'JOB_POST_SEARCH',
  COMPANY_SEARCH: 'COMPANY_SEARCH',
};

const REGEX_VATIDATE = {
  phoneRegExp:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  urlRegExp:
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
};

const CV_TYPES = {
  cvWebsite: 'WEBSITE',
  cvUpload: 'UPLOAD',
};

const DATE_OPTIONS = {
  yesterday: dayjs().add(-1, 'day'),
  today: dayjs(),
  tomorrow: dayjs().add(1, 'day'),
  dayCustom: num => dayjs().add(num, 'day'),
};

export {
  APP_NAME,
  AUTH_PROVIDER,
  AUTH_CONFIG,
  ROLES_NAME,
  HOME_FILTER_CAREER,
  SEARCH_TYPE_WITH_KEYWORD,
  REGEX_VATIDATE,
  CV_TYPES,
  DATE_OPTIONS,
};
