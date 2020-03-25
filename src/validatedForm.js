/* eslint-disable brace-style */
/* eslint-disable no-multi-spaces */
/* eslint-disable react/prop-types */
import React, { cloneElement, useState, useRef, useEffect } from 'react';
import FormGuard from './formGuard';
import deepmerge from 'deepmerge';

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
  useFieldsets = false,
  formVals = {}
}) => {
  // stateBuffer accumulates state changes while the child elements tags are 
  // being processed with injectProps
  // ...allowing us to only call setState once, after all FormGuards have been
  // processed.
  // See; https://github.com/michaellasky/react-formguards/issues/5
  let stateBuffer = {};

  // state consists of:
  //  dirty: has the control been changed?
  //  validated: set by FormGuard to true if the input is being watched
  //  isvalid: true when all the conditions of all watching FormGuards are met
  //  fieldsets: If the form control is nested within fieldsets this will be 
  //    an array with each element being a fieldset name in the hierarchy
  //  blurred: true after the control has been focused and blurred once
  //    Once an element has been blurred we know it's not the
  //    initial change or click

  const [state, setState] = useState({});
  const [vals, setFormVals] = useState(flattenObj(formVals));
  const formRef = useRef(null);
  const managedChildren = injectProps(children);

  // The statebuffer might be mutated after injectProps above
  const hasNewState = Object
    .values(stateBuffer)
    .filter(s => Object.keys(s).length > 0)
    .length > 0;

  if (hasNewState) { setState(deepmerge(state, stateBuffer)); }

  useEffect(invalidateForm, [vals]);

  return (
    <form {...{ className, id, name, ref: formRef, onSubmit: _onSubmit }} >
      {managedChildren}
    </form>
  );

  // injectProps recursively walks through all the child nodes passing any 
  // form elements to handleFormElement() and any FormGuard elements to 
  // handleFormGuard().  
  function injectProps (childNodes = [], fieldsets = []) {

    return React.Children.map(childNodes, (el, key) => {
      if (!el || !el.props) { return el; }

      const { props: { children, name }, type } = el;
      
      const isFormElement = ['input', 'select', 'textarea'].includes(type);
      const isGuard = type === FormGuard;
      const isFieldset = type === 'fieldset' && name;
      const childFs = isFieldset? [ name, ...fieldsets ]: fieldsets;
      
      const injected = injectProps(children, childFs);
      const hasChildren = injected.length > 0;

      if      (isFormElement) { return handleFormElement(el, key, fieldsets); }
      else if (isGuard)       { return handleFormGuard(el, key);              }
      else if (hasChildren)   { return cloneElement(el, {}, injected);        }
      else                    { return el;                                    }
    });

    // handleFormElement 
    // - attaches custom onChange and onBlur event handlers to the given form 
    //   element.
    // - updates the stateBuffer with any fieldsets the control is encapsulated 
    //   within
    // - applies input-invalid css class to the form element as needed
    function handleFormElement (el, key, fieldsets) {
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
      const propClassName = el.props.className || '';
      const elState = state[name] || {};
      const type = getNormalizedType(el);
      const value = determineValue(el, name, type);

      const onChange = (e) => _onChange(e, el.props.onChange);
      const onBlur = (e) => _onBlur(e, el.props.onBlur);

      const invalid = elState.isvalid === false;
      const className = invalid && elState.blurred
        ? `${propClassName} input-invalid`
        : propClassName;

      if (fieldsets.length > 0) {
        if (!stateBuffer[name]) { stateBuffer[name] = {}; }
        
        if (!state[name] || !state[name].fieldsets) {
          stateBuffer[name].fieldsets = fieldsets;
        }
      }

      return ['submit', 'image', 'reset'].includes(type)
        ? el
        : cloneElement(el, { key, className, value, onChange, onBlur });
    }

    // handleFormGuard
    // - Checks all elements the particular guard should be watching for 
    //   validity and updates respective validated, isvalid, dirty, and blurred 
    //   states in the mutable stateBuffer object.
    function handleFormGuard (el, key) {
      const validatesWith = el.props.validatesWith;
      const watches = asArray(el.props.watches);
      const value = watches.map(name => vals[name] || '');
      const isvalid = !!validatesWith.apply(null, value);

      // If any elements in the watches array is dirty or blurred we need to set 
      // the whole group of elements being watched to dirty and/or blurred.
      const [dirty, blurred] = watches.reduce(
        ([groupDirty, groupBlurred], name) => {
          stateBuffer[name] = stateBuffer[name] || {};
          const curState = state[name] || {};
          const markValid = isvalid && curState.isvalid === undefined;
          const invalidate = !isvalid && curState.isvalid !== false;

          if (!curState.validated) {
            stateBuffer[name].validated = true;
          }
          if (invalidate || markValid) {
            stateBuffer[name].isvalid = isvalid;
          }

          return [
            (groupDirty || curState.dirty), 
            (groupBlurred || curState.blurred)
          ];
      }, [false, false]);

      // Sets dirty and blurred values for any state that doesn't already have
      // the current value set.
      for (const name in watches) {
        if (dirty && !isDirty(name)) {
          stateBuffer[name] = { ...(stateBuffer[name] || {}), dirty };
        }
        if (blurred && !hasBeenBlurred(name)) {
          stateBuffer[name] = { ...(stateBuffer[name] || {}), blurred };
        }
      }

      return cloneElement(el, { key, value, dirty, isvalid });
    }
  }

  function _onSubmit (e) {

    e.preventDefault();
    
    // Given the input: ['some', 'text'], 'foo', 'bar' will return 
    // { some: { text: { foo: 'bar' }}}
    function objWithShape (shape, name, value) {
      return shape.reduce((acc, fs) => 
        Object.keys(acc).length === 0
          ? ({ [fs]: { [name]: value } })
          : ({ [fs]: acc })
      , {});
    }

    // We need to process vals to merge in deep fieldsets
    const values = Object.keys(vals).reduce((acc, name) => {
      const fieldsets = state[name]? state[name].fieldsets || []: [];
      if (useFieldsets && fieldsets.length > 0) {
        return deepmerge(acc, objWithShape(fieldsets, name, vals[name]));
      }

      return ({ ...acc, [name]: vals[name] });
    } ,{});

    formIsValid() ? onSubmit(e, values, resetForm) : setFormDirty();
  }

  function _onChange (e, onChange = () => {}) {
    let { target: { name, value, checked, options, files, type } } = e;

    if (type === 'checkbox') {
      value = checked;
    } 
    else if (type === 'select' || type === 'select-multiple') {
      value = Array.from(options).filter(o => o.selected).map(o => o.value);
    } 
    else if (type === 'file' || type === 'file-multiple') {
      value = files;
    }

    setFormVal(name, value);

    if (!isDirty(name)) {
      setState(deepmerge(state, { [name]: { dirty: true } }));
    }

    onChange(e);
  }

  function _onBlur (e, onBlur = () => {}) {
    const { target: { name } } = e;

    if (state[name] && !state[name].blurred) {
      setState(deepmerge(state, { [name]: { blurred: true } }));
    }

    onBlur(e);
  }

  function resetForm () {
    formRef.current.reset();
    setState({});
    setFormVals({});
  }

  function setFormVal (name, value) {
    setFormVals({...vals, [name]: value });
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
    return state[name] && state[name].dirty;
  }

  function hasBeenBlurred (name) {
    return state[name] && state[name].blurred;
  }

  function formIsValid () {
    return Object
      .values(state)
      .filter(s => s.validated && !s.isvalid)
      .length === 0;
  }

  function flattenObj (obj) {
    return Object.entries(obj).reduce((acc, [key, val]) => {
      const isObj = typeof val === 'object' && !(val instanceof Array);
      return { ...acc, ...(isObj? flattenObj(val): { [key]: val }) }
    }, {});
  }
}

export default ValidatedForm;
