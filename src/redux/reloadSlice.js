import {createSlice} from '@reduxjs/toolkit';

export const reloadSlice = createSlice({
  name: 'reload',
  initialState: {
    isReloadExperience: false,
    isReloadEducation: false,
    isReloadCertificate: false,
    isReloadLanguageSkill: false,
    isReloadAdvancedSkill: false,
    isReloadPersonalProfile: false,
    isReloadGeneralProfile: false,
    isReloadAttachedProfile: false,
    jobPostSaved: {
      id: null,
      status: false,
    },
    companyFollowed: {
      id: null,
      status: false,
    },
    isReloadNotification: false,
  },
  reducers: {
    reloadExperience: state => {
      state.isReloadExperience = !state.isReloadExperience;
    },
    reloadEducation: state => {
      state.isReloadEducation = !state.isReloadEducation;
    },
    reloadCertificate: state => {
      state.isReloadCertificate = !state.isReloadCertificate;
    },
    reloadLanguageSkill: state => {
      state.isReloadLanguageSkill = !state.isReloadLanguageSkill;
    },
    reloadAdvancedSkill: state => {
      state.isReloadAdvancedSkill = !state.isReloadAdvancedSkill;
    },
    reloadPersonalProfile: state => {
      state.isReloadPersonalProfile = !state.isReloadPersonalProfile;
    },
    reloadGeneralProfile: state => {
      state.isReloadGeneralProfile = !state.isReloadGeneralProfile;
    },
    reloadAttachedProfile: state => {
      state.isReloadAttachedProfile = !state.isReloadAttachedProfile;
    },
    reloadSaveJobPost: (state, action) => {
      state.jobPostSaved.id = action.payload.id;
      state.jobPostSaved.status = action.payload.status;
    },
    reloadFollowCompany: (state, action) => {
      state.companyFollowed.id = action.payload.id;
      state.companyFollowed.status = action.payload.status;
    },
    reloadJobPostNotification: (state) => {
      state.isReloadNotification = !state.isReloadNotification;
    },
  },
});

const {reducer} = reloadSlice;
const {
  reloadExperience,
  reloadEducation,
  reloadCertificate,
  reloadLanguageSkill,
  reloadAdvancedSkill,
  reloadPersonalProfile,
  reloadGeneralProfile,
  reloadAttachedProfile,
  reloadSaveJobPost,
  reloadFollowCompany,
  reloadJobPostNotification
} = reloadSlice.actions;

export default reducer;
export {
  reloadExperience,
  reloadEducation,
  reloadCertificate,
  reloadLanguageSkill,
  reloadAdvancedSkill,
  reloadPersonalProfile,
  reloadGeneralProfile,
  reloadAttachedProfile,
  reloadSaveJobPost,
  reloadFollowCompany,
  reloadJobPostNotification
};
