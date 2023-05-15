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
      pageSize: 14,
    },
    jobPostAroundFilter: {
      kw: '',
      careerId: '',
      cityId: '',
      positionId: '',
      experienceId: '',
      typeOfWorkplaceId: '',
      jobTypeId: '',
      genderId: '',
      isPagination: 'NOTOK',
      page: 1,
      pageSize: 14,
    },
    companyFilter: {
      kw: '',
      cityId: '',
      page: 1,
      pageSize: 14,
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
        pageSize: 14,
      };
    },
    searchJobPostAround: (state, action) => {
      state.jobPostAroundFilter = {
        ...state.jobPostAroundFilter,
        ...action.payload,
      };
    },
    resetSearchJobPostAround: state => {
      state.jobPostAroundFilter = {
        kw: '',
        careerId: '',
        cityId: '',
        positionId: '',
        experienceId: '',
        typeOfWorkplaceId: '',
        jobTypeId: '',
        genderId: '',
        isPagination: 'NOTOK',
        page: 1,
        pageSize: 14,
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
        pageSize: 14,
      };
    },
  },
});

const {reducer} = userSlice;
const {
  searchJobPost,
  resetSearchJobPostFilter,
  searchJobPostAround,
  resetSearchJobPostAround,
  searchCompany,
  resetSearchCompany,
} = userSlice.actions;

export default reducer;
export {
  searchJobPost,
  resetSearchJobPostFilter,
  searchJobPostAround,
  resetSearchJobPostAround,
  searchCompany,
  resetSearchCompany,
};
