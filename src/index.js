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

  function _onChange ({target}) {
    let { name, value, options, checked, type } = target;

    if (type === 'checkbox') {
      // A checkbox will pass the current state on change
      // so if it wasn't checked, when clicked it'll pass "false" to the change
      // function as its value.  Clicking the checked checkbox will pass "true".  
      // If value isn't "true" || "false" then that means the tag has a value
      // attribute and we'll just use that.
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
  }

  function mergeState (name, st) {
    setState({...state, [`${name}`]: {...state[name], ...st}});
  }

  function setFormVal (name, val) {
    if (val === undefined) {
      delete vals[name]; // don't like mutating vals, but cleaner than reducer
      setFormVals(vals);
    }
    else {
      setFormVals({ ...vals, [`${name}`]: val });
    }
  }

  function injectProps (children = []) {
    return React.Children.map(children, (child, key) => {
      if (!child || !child.props) { return child; }

      const props = child.props;
      const grandkids = child.props.children;
      const isFormElement = formTypes.includes(child.type);
      const isGuard = props.watches && props.validatesWith;

      if      (isFormElement) { return handleFormElement(child, key); }
      else if (isGuard)       { return handleFormGuard(child, key);   }
      else                    { 
        return React.cloneElement(child, {}, injectProps(grandkids)); 
      }
    });

    function handleFormElement (child, key) {
      if (child.props.type === 'submit') { return child; }

      const props = child.props;
      const { type, name } = props;
      const defValue = defautValues[type];
      const value = type === 'radio' 
                      ? props.value  // radios share same name w/ diff vals 
                      : vals[name] || props.value || defValue;

      const {isvalid, dirty} = state[name] || {};
      const inputInvalid = isvalid !== undefined && !isvalid && dirty;

      const className = classnames(
        props.className,
        { 'input-invalid': inputInvalid });

      const onChange = (e) => {
        if (props.onChange) { props.onChange(e); }
        _onChange(e);
      }

      return React.cloneElement(child, {
        value, className, key,  onChange
      });
    }

    function handleFormGuard (child, key) {
      const name = child.props.watches;
      const value = vals[name] || '';

      if (!state[name] || !state[name].validated) {
        mergeState(name, { validated: true });
      }

      return React.cloneElement(child, {
        state: state[name], key, mergeState, value
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
  const isvalid = validatesWith(value);
  const markValid = isvalid && state.isvalid === undefined;
  const invalidate = !isvalid && state.isvalid !== false;

  if (invalidate || markValid) { mergeState(watches, { isvalid }); }

  return !isvalid && state.dirty === true &&
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
