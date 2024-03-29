import httpRequest from '../utils/httpRequest';

const commonService = {
  getConfigs: () => {
    const url = 'api/common/configs/';

    return httpRequest.get(url);
  },
  getDistrictsByCityId: cityId => {
    const url = `api/common/districts/?cityId=${cityId}`;
    return httpRequest.get(url);
  },
  getTop10Careers: () => {
    const url = '/api/common/top-careers/';

    return httpRequest.get(url);
  },
  getAllCareers: (params={}) => {
    const url = '/api/common/all-careers/';

    return httpRequest.get(url, {
      params: params
    });
  },
  getTotalJobByJobType: () => {
    const url = '/api/common/count-jobs-by-job-type/';

    return httpRequest.get(url);
  },
};

export default commonService;
