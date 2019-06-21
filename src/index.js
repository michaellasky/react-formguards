/* eslint-disable padded-blocks */
/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable no-multi-spaces */
/* eslint-disable brace-style */
/* eslint-disable no-control-regex */
import React, { useState, useEffect } from 'react';

const formTypes = ['input', 'select', 'textarea'];
const defaultValues = {
  'checkbox': false,
  'select-multiple': [],
  'file-multiple': []
}

const asArray = val => Array.isArray(val) ? val : [val];

export const ValidatedForm = ({
  children,
  className,
  id,
  name,
  onSubmit,
  formVals = {}
}) =>  {

  const [state, setState] = useState({});
  const [vals, setFormVals] = useState(formVals);

  useEffect(() => { invalidateForm(); }, [vals]);

  function _onSubmit (e) {
    e.preventDefault();

    if (!formIsValid()) { setFormDirty();               }
    else                { onSubmit(e, vals, resetForm); }
  }

  function resetForm () {
    setState({});
    setFormVals({});
  }

  function injectProps (childNodes = []) {

    return React.Children.map(childNodes, (el, key) => {
      if (!el || !el.props) { return el; }

      const { props, type } = el;
      const children = props.children ? injectProps(props.children) : [];
      const isFormElement = formTypes.includes(type);
      const isGuard = type === FormGuard;

      if (isFormElement) {
        return handleFormElement(el, key);
      }
      else if (isGuard) {
        return handleFormGuard(el, key);
      }
      else if (children.length > 0) {
        return React.cloneElement(el, {}, children);
      }
      else {
        return el;
      }
    });

    function handleFormElement (el, key) {

      function getNormalizedType (el) {
        const multiple = el.props.multiple;
        const [select, file] = [el.type === 'select', el.type === 'file'];

        if      (select && multiple) { return 'select-multiple';        }
        else if (file && multiple)   { return 'file-multiple';          }
        else                         { return el.props.type || el.type; }
      }

      function getDefaultValue (type) {
        return defaultValues[type] === undefined ? '' : defaultValues[type];
      }

      function getValue (type, propsVal, name) {
        if      (type === 'radio')             { return propsVal; }
        else if (type.substr(0, 4) === 'file') { return undefined; }
        else {
          return vals[name] || propsVal || getDefaultValue(type);
        }
      }

      const { name, onChange } = el.props;
      const { isvalid, dirty } = state[name] || {};
      const type = getNormalizedType(el);
      const value = getValue(type, el.props.value, name);
      const inputInvalid = isvalid !== undefined && !isvalid && dirty;
      const isSubmissionType = ['submit', 'image', 'reset'].includes(type);
      const classes = el.props.className;

      if (isSubmissionType) {
        return el;
      }
      else {

        return React.cloneElement(el, {
          onBlur: el.props.onBlur,
          onClick: el.props.onClick,
          onFocus: el.props.onFocus,
          onSelect: el.props.onSelect,
          className: inputInvalid ? `${classes} input-invalid` : classes,
          onChange: (e) => _onChange(e, onChange),
          value,
          key
        });
      }
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

  function _onChange (e, onChange = () => {}) {
    let { target: { name, value, options, files, type } } = e;

    if (type === 'checkbox') {
      // A checkbox will pass the *current* state on change as string on click
      if      (value === 'true')  { value = false;    }
      else if (value === 'false') { value = true;     }
    }
    else if (type === 'select' || type === 'select-multiple') {
      value = Array.from(options).reduce((selected, option) =>
        option.selected ? [ ...selected, option.value ] : selected,
      []);
    }
    else if (type === 'file') {
      value = files;
    }

    if (state[name] && state[name].dirty !== true) {
      mergeState(name, { dirty: true });
    };

    setFormVal(name, value);
    onChange(e);
  }

  function mergeState (name, st) {
    setState({ ...state, [name]: { ...state[name], ...st } });
  }

  function setFormVal (name, val) {
    if (val === undefined) {
      delete vals[name];
      setFormVals(vals);
    }
    else {
      setFormVals({ ...vals, [name]: val });
    }
  }

  function formIsValid () {
    const states = Object.values(state);

    return states.length === 0 || !(states.reduce((invalid, cState) =>
      invalid || (cState.validated && !cState.isvalid), false
    ));
  }

  function setFormDirty () {
    setState(Object.entries(state).reduce((dirty, [name, cState]) =>
      ({ ...dirty, [name]: { ...cState, dirty: true } }), {}
    ));
  }

  function invalidateForm () {
    setState(Object.entries(state).reduce((invalid, [name, st]) =>
      ({ ...invalid, [name]: { ...st, isvalid: undefined } }), {}
    ));
  }

  return (
    <form {...{ className, id, name }} onSubmit={_onSubmit}>
      {injectProps(children)}
    </form>
  );
}

export const FormGuard = ({
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
}

export const validators = {
  phone: function (value = '') {
    return PHONE_REGEX.test(value);
  },
  email: function (value = '') {
    return EMAIL_REGEX.test(value);
  },
  minLength: function (len) {
    return (value = '') => value.length >= len;
  },
  maxLength: function(len) {
    return (value = '') => value.length <= len;
  },
  required: function(value = '') {

    return typeof value === 'number' || (
              value !== null &&
              value !== undefined &&
              value.length !== 0 &&
              Object.keys(value).length !== 0 &&
              value !== '');
  }
}

export const EMAIL_REGEX = /^$|(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const PHONE_REGEX = /^$|^(\+\d{1,3})?\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
