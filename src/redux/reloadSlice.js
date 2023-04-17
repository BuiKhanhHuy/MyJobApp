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
    isReloadAttachedProfile: false
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
    reloadAttachedProfile:  state => {
      state.isReloadAttachedProfile = !state.isReloadAttachedProfile;
    }
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
  reloadAttachedProfile
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
  reloadAttachedProfile
};
