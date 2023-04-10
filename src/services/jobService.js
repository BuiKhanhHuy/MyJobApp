import httpRequest from '../utils/httpRequest';

const jobService = {
  getJobPosts: (params = {}) => {
    const url = 'api/job/app/job-posts/';

    return httpRequest.get(url, {
      params: params,
    });
  },
  getJobPostDetailById: (slug) => {
    const url = `api/job/app/job-posts/${slug}/`;

    return httpRequest.get(url);
  },
  getSuggestedJobPosts: (params = {}) => {
    const url = 'api/job/app/job-posts/suggested-job-posts/';

    return httpRequest.get(url, {
      params: params,
    });
  },
  getJobPostsSaved: (params = {}) => {
    const url = `api/job/app/job-posts/job-posts-saved/`;

    return httpRequest.get(url, { params: params });
  },
  saveJobPost: (slug) => {
    const url = `api/job/app/job-posts/${slug}/job-saved/`;

    return httpRequest.post(url);
  },
};

export default jobService;
