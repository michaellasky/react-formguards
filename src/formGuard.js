/* eslint-disable no-multi-spaces */
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

  watches = asArray(watches);
  const isDirty = watches.reduce((isDirty, name) => {
    const st = state[name];

    const markValid = isvalid && st && st.isvalid === undefined;
    const invalidate = !isvalid && st && st.isvalid !== false;

    if (invalidate || markValid) { mergeState(name, { isvalid }); }
    if (st.updating)             { mergeState(name, { updating: false }); }

    return isDirty || (st && st.dirty);
  }, false);

  isDirty && watches.forEach(name => {
    if (!state[name].dirty) { mergeState(name, { dirty: true }); }
  });

  return !isvalid && isDirty === true &&
    <span className='validation-error'>{children}</span>;
};

export default FormGuard;
