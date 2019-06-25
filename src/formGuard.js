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

  const elState = asArray(watches).reduce((elState, name) => {
    const curState = state[name] || {};
    const newState = {};
    const groupDirty = elState.groupDirty || curState.dirty;

    const markValid = isvalid && curState.isvalid === undefined;
    const invalidate = !isvalid && curState.isvalid !== false;

    if (!curState.validated)     { newState.validated = true;  }
    if (invalidate || markValid) { newState.isvalid = isvalid; }
    if (curState.updating)       { newState.updating = false;  }

    if (Object.entries(newState).length !== 0) {
      mergeState(name, newState);
    }

    return { ...elState, [name]: newState, groupDirty };
  }, {});

  // If one of the watches elements is dirty we want to mark them all dirty
  if (elState.groupDirty) {
    asArray(watches).forEach(name => {
      if (state[name] && !state[name].dirty) {
        mergeState(name, { dirty: true });
      }
    });
  };

  return !isvalid && elState.groupDirty === true &&
    <span className='validation-error'>{children}</span>;
};

export default FormGuard;
