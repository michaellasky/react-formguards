/* eslint-disable no-multi-spaces */
import { asArray } from './helper-utils';
import React from 'react';

const FormGuard = ({
  children,
  watches,
  state,
  setState,
  validatesWith,
  value
}) => {
  const isvalid = !!validatesWith.apply(null, value);

  const elStates = asArray(watches).reduce((elState, name) => {
    const curState = state[name] || {};
    const curStateEmpty = !state[name];
    const newState = {};
    const groupDirty = elState.groupDirty || curState.dirty;

    const markValid = isvalid && curState.isvalid === undefined;
    const invalidate = !isvalid && curState.isvalid !== false;

    if (curStateEmpty || !curState.validated) { newState.validated = true;  }
    if (invalidate || markValid)              { newState.isvalid = isvalid; }
    if (curState.updating)                    { newState.updating = false;  }

    return { ...elState, [name]: newState, groupDirty };
  }, {});

  const dirty = elStates.groupDirty;
  const hasNewState = Object.values(elStates)
    .filter(s => Object.entries(s || {}).length > 0)
    .length > 0;

  hasNewState && setState({
    ...state,
    ...Object.entries(elStates).reduce(
      (acc, [name, elState]) =>
        ({ ...acc, [name]: { ...state[name], ...elState, dirty } }),
      {})
  });

  return !isvalid && dirty === true &&
    <span className='validation-error'>{children}</span>;
};

export default FormGuard;
