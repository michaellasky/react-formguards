/* eslint-disable brace-style */
/* eslint-disable no-multi-spaces */
/* eslint-disable react/prop-types */
import React, { cloneElement, useState, useRef, useEffect } from 'react';
import FormGuard from './formGuard';

const asArray = val => Array.isArray(val) ? val : [val];

const defaultValues = {
  'checkbox': false,
  'select-multiple': [],
  'file-multiple': []
}

const ValidatedForm = ({
  children,
  className,
  id,
  name,
  onSubmit,
  formVals = {}
}) => {
  // stateBuffer accumulates state changes while the FormGuard tags are being
  // processed with injectProps->handleformGuard.
  // ...allowing us to only call setState once, after all FormGuards have been
  // processed.
  // See; https://github.com/michaellasky/react-formguards/issues/5
  let stateBuffer = {};

  // state consists of:
  //  dirty: has the control been changed?
  //  validated: set by FormGuard to true if the input is being watched
  //  isvalid: true when all the conditions of all watching FormGuards are met
  //  blurred: true after the control has been focused and blurred once
  //    Once an element has been blurred we know it's not the
  //    initial change or click
  //    See: https://github.com/michaellasky/react-formguards/issues/7
  const [state, setState] = useState({});
  const [vals, setFormVals] = useState(formVals);
  const formRef = useRef(null);
  const managedChildren = injectProps(children);

  const hasNewState = Object
    .values(stateBuffer)
    .filter(s => Object.keys(s).length > 0)
    .length > 0;

  if (hasNewState) { setState(mergeState(state, stateBuffer)); }

  useEffect(invalidateForm, [vals]);

  return (
    <form {...{ className, id, name, ref: formRef, onSubmit: _onSubmit }} >
      {managedChildren}
    </form>
  );

  // This function walks through the children recursively and
  // replaces form elements with managed versions
  function injectProps (childNodes = []) {
    return React.Children.map(childNodes, (el, key) => {
      if (!el || !el.props) { return el; }

      const { props: { children }, type } = el;
      const injected = injectProps(children);
      const hasChildren = injected.length > 0;
      const isFormElement = ['input', 'select', 'textarea'].includes(type);
      const isGuard = type === FormGuard;

      if      (isFormElement) { return handleFormElement(el, key);     }
      else if (isGuard)       { return handleFormGuard(el, key);       }
      else if (hasChildren)   { return cloneElement(el, {}, injected); }
      else                    { return el; }
    });

    function handleFormElement (el, key) {
      function getNormalizedType (el) {
        const multiple = el.props.multiple;
        const [select, file] = [el.type === 'select', el.type === 'file'];

        if      (select && multiple) { return 'select-multiple';        }
        else if (file && multiple)   { return 'file-multiple';          }
        else                         { return el.props.type || el.type; }
      }

      function determineValue (el, name, type) {
        const value = vals[name] || el.props.value || defaultValues[type] || '';

        if      (type === 'radio')             { return el.props.value; }
        else if (type.substr(0, 4) === 'file') { return undefined;      }
        else                                   { return value;          }
      }

      const name = el.props.name;
      const elState = state[name] || {};
      const type = getNormalizedType(el);
      const value = determineValue(el, name, type);
      const onChange = (e) => _onChange(e, el.props.onChange);
      const onBlur = (e) => _onBlur(e, el.props.onBlur);

      const invalid = elState.isvalid === false;
      const className = invalid && elState.blurred === true
        ? `${el.props.className || ''} input-invalid`
        : el.props.className || '';

      return ['submit', 'image', 'reset'].includes(type)
        ? el
        : cloneElement(el, { key, className, value, onChange, onBlur });
    }

    function handleFormGuard (el, key) {
      const validatesWith = el.props.validatesWith;
      const watches = asArray(el.props.watches);
      const value = watches.map(name => vals[name] || '');
      const isvalid = !!validatesWith.apply(null, value);

      // WARNING: Side Effect - This reducer also mutates stateBuffer
      const [dirty, blurred] = watches.reduce(([groupDirty, blurred], name) => {
        stateBuffer[name] = stateBuffer[name] || {};
        const curState = mergeState(state[name], stateBuffer[name]);
        const curStateEmpty = Object.keys(curState).length === 0;
        const markValid = isvalid && curState.isvalid === undefined;
        const invalidate = !isvalid && curState.isvalid !== false;

        if (curStateEmpty || !curState.validated) {
          stateBuffer[name].validated = true;
        }
        if (invalidate || markValid) {
          stateBuffer[name].isvalid = isvalid;
        }

        return [(groupDirty || curState.dirty), (blurred || curState.blurred)];
      }, [false, false]);

      // If any in the group are dirty or blurred it makes the whole group dirty
      // or blurred.
      // TODO: Refactor this mess for dirty / blurred
      stateBuffer = {
        ...stateBuffer,
        ...watches.reduce(
          (acc, name) => ({
            ...acc,
            [name]: isDirty(name) === dirty
              ? stateBuffer[name]
              : { ...stateBuffer[name], dirty } }),
          {}),
        ...watches.reduce(
          (acc, name) => ({
            ...acc,
            [name]: hasBeenBlurred(name) === blurred
              ? stateBuffer[name]
              : { ...stateBuffer[name], blurred } }),
          {})
      };

      return cloneElement(el, { key, value, dirty, isvalid });
    }
  }

  function mergeState (state1, state2) {
    if (!state1 || !state2) { return (state1 || state2); }

    return {
      ...state1,
      ...Object.entries(state2).reduce(
        (acc, [name, elState]) =>
          ({ ...acc, [name]: { ...state1[name], ...elState } }),
        {})
    }
  }

  function _onSubmit (e) {
    e.preventDefault();
    formIsValid() ? onSubmit(e, vals, resetForm) : setFormDirty();
  }

  function _onChange (e, onChange = () => {}) {
    let { target: { name, value, checked, options, files, type } } = e;

    if (type === 'checkbox') {
      value = checked;
    } else if (type === 'select' || type === 'select-multiple') {
      value = Array.from(options).filter(o => o.selected).map(o => o.value);
    } else if (type === 'file' || type === 'file-multiple') {
      value = files;
    }

    setFormVal(name, value);

    if (!isDirty(name)) {
      setState(mergeState(state, { [name]: { dirty: true } }));
    }

    onChange(e);
  }

  function _onBlur (e, onBlur = () => {}) {
    const { target: { name } } = e;

    if (state[name] && !state[name].blurred) {
      setState(mergeState(state, { [name]: { blurred: true } }));
    }

    onBlur(e);
  }

  function resetForm () {
    formRef.current.reset();
    setState({});
    setFormVals({});
  }

  function setFormVal (name, val) {
    setFormVals({ ...vals, [name]: val });
  }

  function setStateValueForAllElements (st) {
    setState(Object.entries(state).reduce(
      (acc, [name, elState]) =>
        ({ ...acc, [name]: { ...elState, ...st } }),
      {}
    ));
  }

  function setFormDirty () {
    setStateValueForAllElements({dirty: true, blurred: true});
  }

  function invalidateForm () {
    setStateValueForAllElements({isvalid: undefined});
  }

  function isDirty (name) {
    return (stateBuffer[name] && stateBuffer[name].dirty) ||
           (state[name] && state[name].dirty);
  }

  function hasBeenBlurred (name) {
    return (stateBuffer[name] && stateBuffer[name].blurred) ||
           (state[name] && state[name].blurred);
  }

  function formIsValid () {
    return Object
      .values(state)
      .filter(s => s.validated && !s.isvalid)
      .length === 0;
  }
}

export default ValidatedForm;
