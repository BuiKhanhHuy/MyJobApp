import React from 'react';

import FilterJobPostForm from '../forms/FilterJobPostForm/FilterJobPostForm';

const JobPostSearch = ({openPopup, setOpenPopup}) => {
  const handleFilter = data => {
    console.log(data);
  };

  return (
    <FilterJobPostForm
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
      handleFilter={handleFilter}
    />
  );
};

export default JobPostSearch;
