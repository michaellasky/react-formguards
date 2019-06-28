/* eslint-disable brace-style */
/* eslint-disable no-multi-spaces */
/* eslint-disable react/prop-types */
import React, { cloneElement, useState, useRef, useEffect } from 'react';
import {asArray} from './helper-utils';
import mergeWith from 'lodash.mergewith';
import FormGuard from './formGuard';

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
  // state consists of:
  //  dirty: has the control been changed?
  //  validated: set by FormGuard to true if the input is being watched
  //  isvalid: true when all the conditions of all watching FormGuards are met
  let stateBuffer = {};
  const [state, setState] = useState({});
  const [vals, setFormVals] = useState(formVals);
  const formRef = useRef(null);
  const managedChildren = injectProps(children);
  const newState = Object.values(stateBuffer).filter(s => Object.keys(s).length > 0).length > 0;

  if (newState) { setState(mergeState(state, stateBuffer)); }

  useEffect(invalidateForm, [vals]);

  return (
    <form {...{ className, id, name, ref: formRef, onSubmit: _onSubmit }} >
      {managedChildren}
    </form>
  );

  // This function walks through the children recursively and
  // replaces form elements with managed versions, and also passes
  // current form element values to relevant FormGuards for validation
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
      const type = getNormalizedType(el);
      const value = determineValue(el, name, type);
      const onChange = (e) => _onChange(e, el.props.onChange);
      const invalid = state[name] && state[name].isvalid === false;
      const className = invalid && isDirty(name)
        ? `${el.props.className} input-invalid`
        : el.props.className;

      return ['submit', 'image', 'reset'].includes(type)
        ? el
        : cloneElement(el, { key, className, value, onChange });
    }

    function handleFormGuard (el, key) {
      const validatesWith = el.props.validatesWith;
      const watches = asArray(el.props.watches);
      const value = watches.map(name => vals[name] || '');
      const isvalid = !!validatesWith.apply(null, value);

      const dirty = watches.reduce((groupDirty, name) => {
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

        return groupDirty || curState.dirty === true;
      }, false);

      const newlyDirty = watches
        .filter(
          name =>
            stateBuffer[name].dirty !== dirty ||
            (state[name] && state[name].dirty !== dirty));

      stateBuffer = {
        ...stateBuffer,
        ...watches.reduce(
          (acc, name) => ({
            ...acc,
            [name]: !newlyDirty.includes(name)
              ? { ...stateBuffer[name], dirty }
              : stateBuffer[name]}),
          {})
      };

      return cloneElement(el, { key, value, dirty, isvalid });
    }
  }

  function mergeState (state1, state2) {
    return mergeWith(
      state1,
      state2,
      (v1, v2, k) => k === 'isvalid' ? v1 && v2 : undefined);
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

    if (!isDirty(name)) {
      updateState(name, { dirty: true });
    }

    setFormVal(name, value);
    onChange(e);
  }

  function resetForm () {
    formRef.current.reset();
    setState({});
    setFormVals({});
  }

  function updateState (name, st) {
    setState(mergeWith(state, { [name]: st }));
  }

  function setFormVal (name, val) {
    setFormVals({ ...vals, [name]: val });
  }

  function setStateValueForAllElements (key, val) {
    setState(Object.entries(state).reduce(
      (acc, [name, controlState]) =>
        ({ ...acc, [name]: { ...controlState, [key]: val } }),
      {}
    ));
  }

  function setFormDirty () {
    setStateValueForAllElements('dirty', true);
  }

  function invalidateForm () {
    setStateValueForAllElements('isvalid', undefined);
  }

  function isDirty (name) {
    return state[name] && state[name].dirty;
  }

  function formIsValid () {
    return Object
      .values(state)
      .filter(s => s.validated && !s.isvalid)
      .length === 0;
  }
}

export default ValidatedForm;
