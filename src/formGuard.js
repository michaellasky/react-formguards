import React from 'react';

const FormGuard = ({ children, dirty, isvalid }) => {
  return !isvalid && dirty === true &&
    <span className='validation-error'>{children}</span>;
};

export default FormGuard;
