import httpRequest from '../utils/httpRequest';

const companyService = {
  // public
  getCompanies: (params = {}) => {
    const url = '/api/info/app/companies/';

    return httpRequest.get(url, {
      params: params,
    });
  },
  getCompanyDetailById: id => {
    const url = `/api/info/app/companies/${id}/`;

    return httpRequest.get(url);
  },
  followCompany: id => {
    const url = `/api/info/app/companies/${id}/followed/`;

    return httpRequest.post(url);
  },
  getTopCompanies: () => {
    const url = `/api/info/app/companies/top/`;

    return httpRequest.get(url);
  },
};

export default companyService;
