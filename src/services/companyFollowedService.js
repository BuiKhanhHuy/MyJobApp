import httpRequest from "../utils/httpRequest";

const companyFollowedService = {
  getCompaniesFollowed: (params = {}) => {
    const url = '/api/info/app/companies-follow/';

    return httpRequest.get(url, { params: params });
  },
};

export default companyFollowedService;
