import httpRequest from '../utils/httpRequest';

const resumeService = {
  getResumeOwner: (resumeId) => {
    const url = `api/info/app/private-resumes/${resumeId}/resume-owner/`;

    return httpRequest.get(url);
  },
  getCv: (resumeId) => {
    const url = `api/info/app/private-resumes/${resumeId}/cv/`;

    return httpRequest.get(url);
  },
  updateCV: (resumeId, formData) => {
    const url = `api/info/app/private-resumes/${resumeId}/cv/`;

    return httpRequest.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  addResume: (data) => {
    const url = 'api/info/app/private-resumes/';

    return httpRequest.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateResume: (id, data) => {
    const url = `api/info/app/private-resumes/${id}/`;

    return httpRequest.put(url, data);
  },
  deleteResume: (resumeId) => {
    const url = `api/info/app/private-resumes/${resumeId}/`;

    return httpRequest.delete(url);
  },
  activeResume: (resumeId) => {
    const url = `api/info/app/private-resumes/${resumeId}/resume-active/`;

    return httpRequest.get(url);
  },
  getExperiencesDetail: (resumeId) => {
    const url = `api/info/app/private-resumes/${resumeId}/experiences-detail/`;

    return httpRequest.get(url);
  },
  getEducationsDetail: (resumeId) => {
    const url = `api/info/app/private-resumes/${resumeId}/educations-detail/`;

    return httpRequest.get(url);
  },
  getCertificates: (resumeId) => {
    const url = `api/info/app/private-resumes/${resumeId}/certificates-detail/`;

    return httpRequest.get(url);
  },
  getLanguageSkills: (resumeId) => {
    const url = `api/info/app/private-resumes/${resumeId}/language-skills/`;

    return httpRequest.get(url);
  },
  getAdvancedSkills: (resumeId) => {
    const url = `api/info/app/private-resumes/${resumeId}/advanced-skills/`;

    return httpRequest.get(url);
  },
};

export default resumeService;
