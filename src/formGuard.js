/* eslint-disable no-multi-spaces */
import { asArray } from './helper-utils';
import React from 'react';

const FormGuard = ({
  children,
  watches,
  state,
  bufferState,
  validatesWith,
  value
}) => {
  const isvalid = !!validatesWith.apply(null, value);

  const elStates = asArray(watches).reduce((elStates, name) => {
    const curState = state[name] || {};
    const curStateEmpty = !state[name];
    const newState = {};
    const groupDirty = elStates.groupDirty === true || curState.dirty === true;

    const markValid = isvalid && curState.isvalid === undefined;
    const invalidate = !isvalid && curState.isvalid !== false;

    if (curStateEmpty || !curState.validated) { newState.validated = true;  }
    if (invalidate || markValid)              { newState.isvalid = isvalid; }
    if (curState.updating)                    { newState.updating = false;  }

    return { ...elStates, [name]: newState, groupDirty };
  }, {});

  const dirty = elStates.groupDirty;
  const withoutGroupDirty = Object.entries(elStates).filter(([name, _]) =>
    name !== 'groupDirty');

  const hasNewState = withoutGroupDirty
    .filter(([_, st]) => Object.entries(st).length > 0)
    .length > 0;

  hasNewState && bufferState(withoutGroupDirty.reduce(
    (acc, [name, elState]) =>
      ({ ...acc, [name]: { ...elState, dirty } }),
    {}));

  return !isvalid && dirty === true &&
    <span className='validation-error'>{children}</span>;
};

export default FormGuard;
