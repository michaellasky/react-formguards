/* eslint-disable indent */
/* eslint-disable space-infix-ops */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multi-spaces */
/* eslint-disable brace-style */
/* eslint-disable no-control-regex */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

const formTypes = ['input', 'select', 'textarea'];
const defautValues = {
  'checkbox': false,
  'text': '',
  'hidden': '',
  'textarea': '',
  'email': '',
  'tel': '',
  'password': '',
  'select': [],
  'select-multiple': [],
  'file': '',
  'radio': ''
}

const ValidatedForm = ({
  children,
  onSubmit,
  formVals = {}
}) => {
  const [state, setState] = useState({});
  const [vals, setFormVals] = useState(formVals);

  useEffect(() => { invalidateForm(); }, [vals]);

  function _onSubmit (e) {
    e.preventDefault();
  
    if (!formIsValid()) { setFormDirty();                   }
    else                { onSubmit(e, vals, resetForm); }
  }

  function resetForm () {
    setState({});
    setFormVals({});
  }

  function _onChange (e, onChange = () => {}) {
    let { target: { name, value, options, checked, type } } = e;

    if (type === 'checkbox') {
      // A checkbox will pass the *current* state on change as string on click
      // Invert it because we want the form variable to to hold the after-click state  
      if      (value === 'true')  { value = false;    }
      else if (value === 'false') { value = true;     }
      else if (!checked)          { value = undefined } 
    }
    else if (type === 'select' || type === 'select-multiple') {
      value = Array.from(options).reduce((selected, option) =>
        option.selected ? [...selected, option.value] : selected,
      []);
    }
    mergeState(name, { dirty: true });
    setFormVal(name, value);
    onChange(e);
  }

  function mergeState (name, st) {
    setState({...state, [`${name}`]: {...state[name], ...st}});
  }

  function setFormVal (name, val) {
    if (val === undefined) {
      // delete vals[name]; this might be cleaner, even w/ mutation
      const newVals = Object.entries(vals).reduce((acc, [key, val]) => 
        (key === name)? acc: { ...acc, [`${key}`]: val 
      });
      setFormVals(newVals);
    }
    else {
      setFormVals({ ...vals, [`${name}`]: val });
    }
  }

  function injectProps (nodes = []) {
    return React.Children.map(nodes, (child, key) => {
      if (!child || !child.props) { return child; }

      const { props, type } = child;
      const { children } = props;
      const gKids = children? injectProps(children): children;
      const isFormElement = formTypes.includes(type);
      const isGuard = type === FormGuard;
      
      if      (isFormElement) { return handleFormElement(child, key); }
      else if (isGuard)       { return handleFormGuard(child, key);   }
      else {                    return React.cloneElement(child, {}, gKids); }
    });

    function handleFormElement (child, key) {
      const props = child.props;
      const { type, name, onChange } = props;
      const defValue = defautValues[type];
      const value = type === 'radio' 
                      ? props.value  // radios share same name w/ diff vals 
                      : vals[name] || props.value || defValue;
      const {isvalid, dirty} = state[name] || {};
      const inputInvalid = isvalid !== undefined && !isvalid && dirty;

      if (type === 'submit') { return child; }

      const className = classnames(
        props.className,
        { 'input-invalid': inputInvalid });

      return React.cloneElement(child, {
        value, className, key, onChange: (e) => _onChange(e, onChange) 
      });
    }

    function handleFormGuard (child, key) {
      const watches = (!Array.isArray(child.props.watches))
                        ? [child.props.watches]
                        : child.props.watches;

      const value = watches.map(name => vals[name] || '');
      
      watches.forEach(name => {
        if (!state[name] || !state[name].validated) {
          mergeState(name, { validated: true });
        }
      });
      
      return React.cloneElement(child, {
        state, key, mergeState, value
      });
    }
  }

  function formIsValid () {
    const entries = Object.values(state);

    return entries.length === 0 || !(entries.reduce((invalid, cState) =>
      invalid || (cState.validated && !cState.isvalid), false
    ));
  }

  function setFormDirty () {
    setState(Object.entries(state).reduce((dirty, [name, cState]) =>
      ({...dirty, [`${name}`]: { ...cState, dirty: true }}), {}
    ));
  }

  function invalidateForm () {
    setState(Object.entries(state).reduce((invalid, [name, st]) =>
      ({ ...invalid, [`${name}`]: { ...st, isvalid: undefined } }), {}
    ));
  }

  return (
    <form onSubmit={_onSubmit}>
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
  
  if (!Array.isArray(watches)) { watches = [watches]; }

  watches.forEach(watch => {
    const st = state[watch];
    const markValid = isvalid && st && st.isvalid === undefined;
    const invalidate = !isvalid &&  st && st.isvalid !== false;
  
    if (invalidate || markValid) { mergeState(watch, { isvalid }); }
    isDirty = isDirty || (st && st.dirty); 
  });
  
  return !isvalid && isDirty === true &&
    <span className='form-invalid-message'>{children}</span>;
}

export const validators = {
  phone: function (value = '') {
    return PHONE_REGEX.test(value);
  },
  email: function (value = '') {
    return EMAIL_REGEX.test(value);
  },
  minLength: function (len) {
    return (value = '') => value.length > len;
  },
  maxLength: function(len) {
    return (value = '') => value.length < len;
  },
  required: function(value) {
    return value !== undefined && value.length > 0;
  }
}

export const EMAIL_REGEX = /^$|(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const PHONE_REGEX = /^$|^(\+\d{1,3})?\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;

export default ValidatedForm;
