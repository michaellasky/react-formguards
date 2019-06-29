import React from 'react';

const FormGuard = ({ children, dirty, isvalid, id, name, className }) =>
  !isvalid && dirty === true &&
  <span {...{id, name}} className={`${className} validation-error`}>
    {children}
  </span>;

export default FormGuard;
