/* eslint-disable brace-style */
/* eslint-disable no-multi-spaces */
/* eslint-disable react/prop-types */
import React, { cloneElement, useState, useEffect } from 'react';
import {asArray} from './helper-utils';
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
  const [state, setState] = useState({});
  const [vals, setFormVals] = useState(formVals);

  useEffect(() => { invalidateForm(); }, [vals]);

  // This function walks through the children recursively and
  // replaces form elements with managed versions, and also passes
  // current form element values to relevant FormGuards for validation
  function injectProps (childNodes = []) {
    return React.Children.map(childNodes, (el, key) => {
      if (!el || !el.props) { return el; }
      const { props: { children }, type } = el;
      const injected = injectProps(children);
      const isFormElement = ['input', 'select', 'textarea'].includes(type);
      const isGuard = type === FormGuard;

      if      (isFormElement)       { return handleFormElement(el, key);     }
      else if (isGuard)             { return handleFormGuard(el, key);       }
      else if (injected.length > 0) { return cloneElement(el, {}, injected); }
      else                          { return el; }
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
      const invalid = state[name] && state[name].isvalid === false;
      const type = getNormalizedType(el);
      const className = (invalid && isDirty(name))
        ? `${el.props.className} input-invalid`
        : el.props.className;

      return ['submit', 'image', 'reset'].includes(type)
        ? el
        : React.cloneElement(el, {
          key,
          className,
          value: determineValue(el, name, type),
          onChange: (e) => _onChange(e, el.props.onChange)
        });
    }

    function handleFormGuard (el, key) {
      const watches = asArray(el.props.watches);
      const value = watches.map(name => vals[name] || '');

      watches.forEach(name => {
        if (!state[name] || !state[name].validated) {
          mergeState(name, { validated: true });
        }
      });

      return React.cloneElement(el, { state, key, mergeState, value });
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

    if (!isDirty(name)) {
      mergeState(name, { dirty: true });
    }

    setFormVal(name, value);
    onChange(e);
  }

  function resetForm () {
    setState({});
    setFormVals({});
  }

  function mergeState (name, st) {
    setState({ ...state, [name]: { ...state[name], ...st } });
  }

  function setFormVal (name, val) {
    val === undefined
      ? setFormVals(vals.filter(val => val.name !== name))
      : setFormVals({ ...vals, [name]: val });
  }

  function setStateValueForAllElements (key, val) {
    setState(Object.entries(state).reduce(
      (acc, [name, controlState]) =>
        ({ ...acc, [name]: { ...controlState, [key]: val } }),
      {}
    ));
  }

  function isDirty (name) {
    return state[name] && state[name].dirty;
  }

  function formIsValid () {
    const states = Object.values(state);
    const invalidElements = states.filter(s => s.validated && !s.isvalid);

    return invalidElements.length === 0;
  }

  function setFormDirty () {
    setStateValueForAllElements('dirty', true);
  }

  function invalidateForm () {
    setStateValueForAllElements('isvalid', undefined);
  }

  return (
    <form {...{ className, id, name }} onSubmit={_onSubmit}>
      {injectProps(children)}
    </form>
  );
}

export default ValidatedForm;
