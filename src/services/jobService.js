import httpRequest from '../utils/httpRequest';

const jobService = {
  getJobPosts: (params = {}) => {
    const url = 'api/job/app/job-posts/';

    return httpRequest.get(url, {
      params: params,
    });
  },
  getJobPostDetailById: id => {
    const url = `api/job/app/job-posts/${id}/`;

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

    return httpRequest.get(url, {params: params});
  },
  saveJobPost: id => {
    const url = `api/job/app/job-posts/${id}/job-saved/`;

    return httpRequest.post(url);
  },
  getTotalJobPostByJobType: () => {
    const url = `api/job/app/job-posts/count-job-posts-by-job-type/`;

    return httpRequest.get(url);
  },
  getJobPostsAround: (data = {}) => {
    const url = `/api/job/app/job-posts/job-posts-around/`;

    return httpRequest.post(url, data);
  },
};

export default jobService;
