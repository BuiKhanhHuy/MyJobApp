import httpRequest from '../utils/httpRequest';

const myjobService = {
  createFeedback: data => {
    const url = '/api/myjob/web/feedbacks/';

    return httpRequest.post(url, data);
  },
  getBanners: () => {
    const url = '/api/myjob/app/banner/';

    return httpRequest.get(url);
  },
};

export default myjobService;
