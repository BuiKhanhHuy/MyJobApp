import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'filter',
  initialState: {
    jobPostFilter: {
      kw: '',
      careerId: '',
      cityId: '',
      positionId: '',
      experienceId: '',
      typeOfWorkplaceId: '',
      jobTypeId: '',
      genderId: '',
      page: 1,
      pageSize: 20,
    },
    companyFilter: {
      kw: '',
      cityId: '',
      page: 1,
      pageSize: 20,
    },
  },
  reducers: {
    searchJobPost: (state, action) => {
      state.jobPostFilter = {...state.jobPostFilter, ...action.payload};
    },
    resetSearchJobPostFilter: state => {
      state.jobPostFilter = {
        kw: '',
        careerId: '',
        cityId: '',
        positionId: '',
        experienceId: '',
        typeOfWorkplaceId: '',
        jobTypeId: '',
        genderId: '',
        page: 1,
        pageSize: 20,
      };
    },
    searchCompany: (state, action) => {
      state.companyFilter = {...state.companyFilter, ...action.payload};
    },
    resetSearchCompany: state => {
      state.companyFilter = {
        kw: '',
        cityId: '',
        page: 1,
        pageSize: 20,
      };
    },
  },
});

const {reducer} = userSlice;
const {
  searchJobPost,
  resetSearchJobPostFilter,
  searchCompany,
  resetSearchCompany,
} = userSlice.actions;

export default reducer;
export {
  searchJobPost,
  resetSearchJobPostFilter,
  searchCompany,
  resetSearchCompany,
};
