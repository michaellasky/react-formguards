import { asArray } from './helper-utils';
import React from 'react';

const FormGuard = ({
  children,
  watches,
  state = {},
  mergeState,
  validatesWith,
  value
}) => {
  const isvalid = !!validatesWith.apply(null, value);
  let isDirty = false;

  watches = asArray(watches);
  watches.forEach(watch => {
    const st = state[watch];
    const markValid = isvalid && st && st.isvalid === undefined;
    const invalidate = !isvalid && st && st.isvalid !== false;

    if (invalidate || markValid) { mergeState(watch, { isvalid }); }
    isDirty = isDirty || (st && st.dirty);
  });

  return !isvalid && isDirty === true &&
    <span className='validation-error'>{children}</span>;
};

export default FormGuard;
