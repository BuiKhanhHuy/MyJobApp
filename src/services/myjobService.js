import httpRequest from '../utils/httpRequest';

const myjobService = {
  createFeedback: (data) => {
    const url = '/api/myjob/web/feedbacks/';

    return httpRequest.post(url, data);
  },
};

export default myjobService;
