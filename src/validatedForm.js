/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {asArray} from './helper-utils';
import FormGuard from './formGuard';

const formTypes = ['input', 'select', 'textarea'];
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

      const { props, type } = el;
      const children = props.children ? injectProps(props.children) : [];
      const isFormElement = formTypes.includes(type);
      const isGuard = type === FormGuard;

      if (isFormElement) {
        return handleFormElement(el, key);
      } else if (isGuard) {
        return handleFormGuard(el, key);
      } else if (children.length > 0) {
        return React.cloneElement(el, {}, children);
      } else {
        return el;
      }
    });

    function handleFormElement (el, key) {
      function getNormalizedType (el) {
        const multiple = el.props.multiple;
        const [select, file] = [el.type === 'select', el.type === 'file'];

        if (select && multiple) {
          return 'select-multiple';
        } else if (file && multiple) {
          return 'file-multiple';
        } else {
          return el.props.type || el.type;
        }
      }

      function getDefaultValue (type) {
        return defaultValues[type] === undefined ? '' : defaultValues[type];
      }

      function getValue (type, propsVal, name) {
        if (type === 'radio') {
          return propsVal;
        } else if (type.substr(0, 4) === 'file') {
          return undefined; // We cant programtically set file value
        } else {
          return vals[name] || propsVal || getDefaultValue(type);
        }
      }

      const { name, onBlur, onClick, onFocus, onSelect, onChange } = el.props;
      const invalid = state[name] && state[name].isvalid !== true;
      const type = getNormalizedType(el);
      const value = getValue(type, el.props.value, name);
      const inputInvalid = invalid && isDirty(name);
      const classes = el.props.className;
      const className = inputInvalid ? `${classes} input-invalid` : classes;

      return ['submit', 'image', 'reset'].includes(type)
        ? el
        : React.cloneElement(el, {
          key,
          className,
          value,
          onBlur,
          onClick,
          onFocus,
          onSelect,
          onChange: (e) => _onChange(e, onChange)
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

    if (!formIsValid()) {
      setFormDirty();
    } else {
      onSubmit(e, vals, resetForm);
    }
  }

  function _onChange (e, onChange = () => {}) {
    let { target: { name, value, options, files, type } } = e;

    if (type === 'checkbox') {
      // A checkbox will pass the *current* state on change as string on click
      value = value !== 'true';
    } else if (type === 'select' || type === 'select-multiple') {
      value = Array.from(options).filter(o => o.selected).map(o => o.value);
    } else if (type === 'file') {
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
