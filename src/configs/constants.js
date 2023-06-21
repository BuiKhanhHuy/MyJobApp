import dayjs from 'dayjs';

const APP_NAME = 'MyJob';

const PLATFORM = 'APP';

const AUTH_PROVIDER = {
  FACEBOOK: 'facebook',
  GOOGLE: 'google-oauth2',
};

const AUTH_CONFIG = {
  // BACKEND
  CLIENT_ID: 'tyL9BKk78we2N62FTy6rCV75efm1Pq8Cys43weP6',
  CLIENT_SECRECT:
    'RC8foVq5K8asqCZnuZUFT1QMX1qsYl9YFo2ZFOPv55r8hohHl14Lr1tvQZyG9MggkOpFqKRKegBmjVj3BV2eBTBOMTDqS43zb2xXLvH4RG3VjLsvYj6b6nsKaS1n4bGR',
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

  // RNKommunicateChat
  CHAT_APP_ID: '37525d7363aaf26cc2d1c20b3f4b28d74',
};

const ROLES_NAME = {
  ADMIN: 'ADMIN',
  EMPLOYER: 'EMPLOYER',
  JOB_SEEKER: 'JOB_SEEKER',
};

const HOME_FILTER_CAREER = [
  {
    id: 8,
    name: 'IT - Phần mềm',
  },
  {
    id: 7,
    name: 'IT - Phần cứng',
  },
];

const SEARCH_TYPE_WITH_KEYWORD = {
  JOB_POST_SEARCH: 'JOB_POST_SEARCH',
  JOB_POST_AROUND_SEARCH: 'JOB_POST_AROUND_SEARCH',
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

const JOB_MAP_OPTIONS = {
  o1: {
    value: 3000,
    latitudeDelta: 0.09,
    longitudeDelta: 0.065,
  },
  o2: {
    value: 5000,
    latitudeDelta: 0.14,
    longitudeDelta: 0.11,
  },
  o3: {
    value: 10000,
    latitudeDelta: 0.22,
    longitudeDelta: 0.22,
  },
};

const WEBSITE_DOMAIN = 'https://bkhuy-myjob.netlify.app/';

export {
  APP_NAME,
  PLATFORM,
  AUTH_PROVIDER,
  AUTH_CONFIG,
  ROLES_NAME,
  HOME_FILTER_CAREER,
  SEARCH_TYPE_WITH_KEYWORD,
  REGEX_VATIDATE,
  CV_TYPES,
  DATE_OPTIONS,
  JOB_MAP_OPTIONS,
  WEBSITE_DOMAIN,
};
