import httpRequest from '../utils/httpRequest';

const resumeViewedService = {
  getResumeViewed: (params = {}) => {
    const url = '/api/info/app/resume-views/';

    return httpRequest.get(url, { params: params });
  },
};

export default resumeViewedService;
