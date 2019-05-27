/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
import ValidatedForm, { FormGuard } from './index';
import { render, cleanup, fireEvent } from 'react-testing-library';
import React from 'react';
import { validators } from '.';

afterEach(cleanup);

describe('ValidatedForm', () => {

  it('is truthy', () => {
    expect(ValidatedForm).toBeTruthy()
  });

  it('Allows form elements and guards to be arbitrarily nested in other dom nodes', () => {
    const expectedValue = 'Expected Value';
    const onSubmit = jest.fn();

    const { getByText, queryByText, getByLabelText, container } = render(
      <ValidatedForm onSubmit={onSubmit}>
        <span>
          <label htmlFor='theInput'>Test:</label>
          <p>
            <FormGuard
              watches='theInput'
              validatesWith={(val) => val === expectedValue}>
              Error Message
            </FormGuard>
          </p>
          <div>
            <span><input type='text' id='theInput' name='theInput' /></span>
          </div>
          <input type='submit' value='Submit' />
        </span>
      </ValidatedForm>
    );

    const input = getByLabelText('Test:', container);

    fireEvent.change(input, { target: { value: 'Some Text' } });
    expect(getByText('Error Message', container)).toBeTruthy();

    fireEvent.change(input, { target: { value: expectedValue } });
    expect(queryByText('Error Message', container)).toBe(null);
  });

  it('ForGuards can watch multiple parameters by passing an array to watches', () => {
    const expectedValue = 'Expected Value';
    const onSubmit = jest.fn();

    const { getByText, queryByText, getByLabelText, container } = render(
      <ValidatedForm onSubmit={onSubmit}>
        <FormGuard
          watches={['theInput', 'theInput2']}
          validatesWith={(val, val2) => val === expectedValue || val2 === expectedValue}>
          Error Message
        </FormGuard>
        <label htmlFor='theInput'>Test:</label>
        <input type='text' id='theInput' name='theInput' />
        <label htmlFor='theInput2'>Test2:</label>
        <input type='text' id='theInput2' name='theInput2' />
        <input type='submit' value='Submit' />
      </ValidatedForm>
    );

    const input = getByLabelText('Test:', container);
    const input2 = getByLabelText('Test2:', container);

    fireEvent.change(input, { target: { value: 'Some Text' } });
    expect(getByText('Error Message', container)).toBeTruthy();

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.change(input2, { target: { value: 'Some Text' } });
    expect(getByText('Error Message', container)).toBeTruthy();

    fireEvent.change(input, { target: { value: expectedValue } });
    expect(queryByText('Error Message', container)).toBe(null);
  });

  describe('Sets initial values equal to the formVals prop', () => {
    it('<input type=text />', () => {

      const onSubmit = jest.fn();
      const { getByText, container } = render(
        <ValidatedForm onSubmit={onSubmit} formVals={{input1: '1', input2: '2'}}>
          <label htmlFor='input1'>Test 1:</label>
          <input type='text' id='input1' name='input1' />

          <label htmlFor='input1'>Test 2:</label>
          <input type='text' id='input1' name='input1' />

          <input type='submit' value='Submit' />
        </ValidatedForm>
      );

      const submit = getByText('Submit', container);
      fireEvent.click(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ input1: '1', input2: '2' });
    });

    it('<select />', () => {
  
      const expectedValue = 'Some Different Text';
      const onSubmit = jest.fn();
  
      const { getByText, container } = render(
        <ValidatedForm onSubmit={onSubmit} formVals={{ theInput: expectedValue }}>
          <label htmlFor='theInput'>Test:</label>
          <select id='theInput' name='theInput'>
            <option value='Some Text'>Some Text</option>
            <option value='Some Different Text'>Some Different Text</option>
            <option value='Some Other Text'>Some Other Text</option>
          </select>
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const submit = getByText('Submit', container);
      fireEvent.click(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: expectedValue });
    });

    it('<select multiple />', () => {
  
      const expectedValue = ['Some Different Text', 'Some Text'];
      const onSubmit = jest.fn();
  
      const { getByText, container } = render(
        <ValidatedForm onSubmit={onSubmit} formVals={{ theInput: expectedValue }}>
          <label htmlFor='theInput'>Test:</label>
          <select multiple id='theInput' name='theInput'>
            <option value='Some Text'>Some Text</option>
            <option value='Some Different Text'>Some Different Text</option>
            <option value='Some Other Text'>Some Other Text</option>
          </select>
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const submit = getByText('Submit', container);
      fireEvent.click(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: expectedValue });
    });

    it('<input type="radio" />', () => {
  
      const onSubmit = jest.fn();
      const { getByText, container } = render(
        <ValidatedForm onSubmit={onSubmit} formVals={{ theInput: 'Value 2' }}>
          <label htmlFor='value_1'>Value 1</label>
          <input type='radio' id='value_1' name='theInput' value='Value 1' />
          <label htmlFor='value_2'>Value 2</label>
          <input type='radio' id='value_2' name='theInput' value='Value 2' />
          <label htmlFor='value_3'>Value 3</label>
          <input type='radio' id='value_3' name='theInput' value='Value 3' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const submit = getByText('Submit', container);
  
      fireEvent.click(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: 'Value 2' });
    });

    it('<input type="checkbox" />', () => {

      const onSubmit = jest.fn();
      const expectedValues = { theInput1: true, theInput3: true };

      const { getByText, container } = render(
        <ValidatedForm formVals={expectedValues} onSubmit={onSubmit}>
          <label htmlFor='value_1'>Value 1</label>
          <input type='checkbox' id='value_1' name='theInput1' />
          <label htmlFor='value_2'>Value 2</label>
          <input type='checkbox' id='value_2' name='theInput2' />
          <label htmlFor='value_3'>Value 3</label>
          <input type='checkbox' id='value_3' name='theInput3' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const submit = getByText('Submit', container);
      
      fireEvent.submit(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual(expectedValues);
    });

    it('<textarea />', () => {
      const expectedValue = 'Some Text';
      const onSubmit = jest.fn();
  
      const { getByText, container } = render(
        <ValidatedForm formVals={{ theInput: expectedValue }} onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <textarea id='theInput' name='theInput' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const submit = getByText('Submit', container);
  
      fireEvent.click(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: expectedValue });
    });  
  });

  describe('Passes non-validated input values through onSubmit', () => {
    it('<input type=text />', () => {

      const expectedValue = 'Some Text';
      const onSubmit = jest.fn();
  
      const { getByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <input type='text' id='theInput' name='theInput' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const input = getByLabelText('Test:', container);
      const submit = getByText('Submit', container);
  
      fireEvent.change(input, { target: { value: expectedValue } });
      fireEvent.click(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: expectedValue });
    });
  
    it('<select />', () => {
  
      const expectedValue = 'Some Different Text';
      const onSubmit = jest.fn();
  
      const { getByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <select id='theInput' name='theInput'>
            <option value='Some Text'>Some Text</option>
            <option value='Some Different Text'>Some Different Text</option>
            <option value='Some Other Text'>Some Other Text</option>
          </select>
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const select = getByLabelText('Test:', container);
      const submit = getByText('Submit', container);
  
      fireEvent.change(select, { target: { value: 'Some Different Text' } });
      fireEvent.click(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: expectedValue });
    });
  
    it('<select-multiple />', () => {
  
      const expectedValues = ['Some Text', 'Some Different Text'];
      const onSubmit = jest.fn();
  
      const { getByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <select multiple id='theInput' name='theInput'>
            <option value='Some Text'>Some Text</option>
            <option value='Some Different Text'>Some Different Text</option>
            <option value='Some Other Text'>Some Other Text</option>
          </select>
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const select = getByLabelText('Test:', container);
      const submit = getByText('Submit', container);
  
      Array.from(select.children, (option, i) => {
        if (i === 0 || i === 1) { option.selected = true; }
      });
  
      fireEvent.change(select);
      fireEvent.click(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: expectedValues });
    });
  
    it('<input type="radio" />', () => {
  
      const onSubmit = jest.fn();
  
      const { getByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='value_1'>Value 1</label>
          <input type='radio' id='value_1' name='theInput' value='Value 1' />
          <label htmlFor='value_2'>Value 2</label>
          <input type='radio' id='value_2' name='theInput' value='Value 2' />
          <label htmlFor='value_3'>Value 3</label>
          <input type='radio' id='value_3' name='theInput' value='Value 3' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const rad1 = getByLabelText('Value 1', container);
      const rad2 = getByLabelText('Value 2', container);
      const submit = getByText('Submit', container);
  
      fireEvent.click(rad2);
      fireEvent.click(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: 'Value 2' });
  
      fireEvent.click(rad1);
      fireEvent.click(submit);
  
      expect(onSubmit.mock.calls.length).toBe(2);
      expect(onSubmit.mock.calls[1][1]).toEqual({ theInput: 'Value 1' });
    });
  
    it('<input type="checkbox" />', () => {

      const onSubmit = jest.fn();
      const { getByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='value_1'>Value 1</label>
          <input type='checkbox' id='value_1' name='theInput1' />
          <label htmlFor='value_2'>Value 2</label>
          <input type='checkbox' id='value_2' name='theInput2' />
          <label htmlFor='value_3'>Value 3</label>
          <input type='checkbox' id='value_3' name='theInput3' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const submit = getByText('Submit', container);
      const cb1 = getByLabelText('Value 2', container);
      const cb2 = getByLabelText('Value 3', container);
  
      fireEvent.click(cb1);
      fireEvent.click(cb2);
      fireEvent.submit(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ 
        theInput2: true, 
        theInput3: true 
      });
    });

    it('<textarea />', () => {
      const expectedValue = 'Some Text';
      const onSubmit = jest.fn();
  
      const { getByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <textarea id='theInput' name='theInput' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const input = getByLabelText('Test:', container);
      const submit = getByText('Submit', container);
  
      fireEvent.change(input, { target: { value: expectedValue } });
      fireEvent.click(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: expectedValue });
    });  
  });

  describe('Shows error message when input is invalid', () => {

    it('<input type="text" />', () => {
      const expectedValue = 'Expected Value';
      const onSubmit = jest.fn();

      const { getByText, queryByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <FormGuard
            watches='theInput'
            validatesWith={(val) => val === expectedValue}>
            Error Message
          </FormGuard>
          <input type='text' id='theInput' name='theInput' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );

      const input = getByLabelText('Test:', container);

      fireEvent.change(input, { target: { value: 'Some Text' } });
      expect(getByText('Error Message', container)).toBeTruthy();

      fireEvent.change(input, { target: { value: expectedValue } });
      expect(queryByText('Error Message', container)).toBe(null);
    });

    it('<select />', () => {
      const onSubmit = jest.fn();

      const { getByText, queryByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <FormGuard
            watches='theInput'
            validatesWith={val => val !== undefined && val.length > 0}>
            Error Message
          </FormGuard>
          <select id='theInput' name='theInput'>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );

      const input = getByLabelText('Test:', container);
      const submit = getByText('Submit', container);

      fireEvent.click(submit);
      expect(getByText('Error Message', container)).toBeTruthy();

      fireEvent.change(input, { target: { value: '1' } });
      expect(queryByText('Error Message', container)).toBe(null);
    });

    it('<select multiple />', () => {
      const onSubmit = jest.fn();
      const { getByText, queryByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <FormGuard
            watches='theInput'
            validatesWith={val => val !== undefined && val.length > 0}>
            Error Message
          </FormGuard>
          <select multiple id='theInput' name='theInput'>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const select = getByLabelText('Test:', container);
      const submit = getByText('Submit', container);
  
      fireEvent.click(submit);
      expect(getByText('Error Message', container)).toBeTruthy();
      
      Array.from(select.children, (option, i) => {
        if (i === 0 || i === 1) { option.selected = true; }
      });
  
      fireEvent.change(select);
      expect(queryByText('Error Message', container)).toBe(null);
    });

    it('<input type="radio" />', () => {
      const onSubmit = jest.fn();
      const { getByText, queryByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <FormGuard
            watches='theInput'
            validatesWith={(val) => val === '1' || val === '2'}>
            Error Message
          </FormGuard>
          <label htmlFor='theInput1'>Test1:</label>
          <input type='radio' id='theInput1' name='theInput' value='1' />
          <label htmlFor='theInput2'>Test2:</label>
          <input type='radio' id='theInput2' name='theInput' value='2' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );

      const rad1 = getByLabelText('Test1:', container);
      const rad2 = getByLabelText('Test2:', container);
      const submit = getByText('Submit', container);

      fireEvent.click(submit);
      expect(getByText('Error Message', container)).toBeTruthy();
      
      fireEvent.click(rad1);
      expect(queryByText('Error Message', container)).toBe(null);

      fireEvent.click(rad2);
      expect(queryByText('Error Message', container)).toBe(null);
    });

    it('<input type="checkbox" />', () => {
      const onSubmit = jest.fn();

      const { getByText, queryByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <FormGuard
            watches='theInput1'
            validatesWith={(val) => val === true}>
            Error Message
          </FormGuard>
          <label htmlFor='theInput1'>Test1:</label>
          <input type='checkbox' id='theInput1' name='theInput1' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );

      const cb1 = getByLabelText('Test1:', container);
      const submit = getByText('Submit', container);

      fireEvent.click(submit);
      expect(getByText('Error Message', container)).toBeTruthy();
      
      fireEvent.click(cb1);
      expect(queryByText('Error Message', container)).toBe(null);

      fireEvent.click(cb1);
      expect(queryByText('Error Message', container)).toBeTruthy();
    });

    it('<textarea />', () => {
      const expectedValue = 'Expected Value';
      const onSubmit = jest.fn();

      const { getByText, queryByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <FormGuard
            watches='theInput'
            validatesWith={(val) => val === expectedValue}>
            Error Message
          </FormGuard>
          <textarea id='theInput' name='theInput' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );

      const input = getByLabelText('Test:', container);

      fireEvent.change(input, { target: { value: 'Some Text' } });
      expect(getByText('Error Message', container)).toBeTruthy();

      fireEvent.change(input, { target: { value: expectedValue } });
      expect(queryByText('Error Message', container)).toBe(null);
    });
  });

  describe('Only calls onSubmit when input is valid', () => {

    it('<input type="text" />', () => {
      const expectedValue = 'Expected Value';
      const onSubmit = jest.fn();

      const { getByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <FormGuard
            watches='theInput'
            validatesWith={(val) => val === expectedValue}>
            Error Message
          </FormGuard>
          <input type='text' id='theInput' name='theInput' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );

      const input = getByLabelText('Test:', container);
      const submit = getByText('Submit', container);

      fireEvent.change(input, { target: { value: 'Some Text' } });
      fireEvent.click(submit);

      expect(onSubmit.mock.calls.length).toBe(0);
    
      fireEvent.change(input, { target: { value: expectedValue } });
      fireEvent.click(submit);

      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: expectedValue });
    });

    it('<select />', () => {

      const onSubmit = jest.fn();

      const { getByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <FormGuard
            watches='theInput'
            validatesWith={val => val !== undefined && val.length > 0}>
            Error Message
          </FormGuard>
          <select id='theInput' name='theInput'>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );

      const input = getByLabelText('Test:', container);
      const submit = getByText('Submit', container);

      fireEvent.click(submit);

      expect(onSubmit.mock.calls.length).toBe(0);
    
      fireEvent.change(input, { target: { value: '1' } });
      fireEvent.click(submit);

      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: '1' });
    });

    it('<select multiple/>', () => {

      const onSubmit = jest.fn();

      const { getByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <FormGuard
            watches='theInput'
            validatesWith={val => val !== undefined && val.length > 0}>
            Error Message
          </FormGuard>
          <select multiple id='theInput' name='theInput'>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );

      const select = getByLabelText('Test:', container);
      const submit = getByText('Submit', container);

      fireEvent.click(submit);

      expect(onSubmit.mock.calls.length).toBe(0);
 
      Array.from(select.children, (option, i) => {
        if (i === 0 || i === 1) { option.selected = true; }
      });
  
      fireEvent.change(select);
      fireEvent.click(submit);

      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: ['1', '2'] });
    });

    it('<input type="radio" />', () => {
      const onSubmit = jest.fn();

      const { getByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <FormGuard
            watches='theInput'
            validatesWith={(val) => val === '1' || val === '2'}>
            Error Message
          </FormGuard>
          <label htmlFor='theInput1'>Test1:</label>
          <input type='radio' id='theInput1' name='theInput' value='1' />
          <label htmlFor='theInput2'>Test2:</label>
          <input type='radio' id='theInput2' name='theInput' value='2' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );

      const rad1 = getByLabelText('Test1:', container);
      const rad2 = getByLabelText('Test2:', container);
      const submit = getByText('Submit', container);

      fireEvent.click(submit);
      expect(onSubmit.mock.calls.length).toBe(0);
      
      fireEvent.click(rad1);
      fireEvent.click(submit);
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: '1' });

      fireEvent.click(rad2);
      fireEvent.click(submit);
      expect(onSubmit.mock.calls.length).toBe(2);
      expect(onSubmit.mock.calls[1][1]).toEqual({ theInput: '2' });
    });

    it('<textarea />', () => {

      const expectedValue = 'Expected Value';
      const onSubmit = jest.fn();

      const { getByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <FormGuard
            watches='theInput'
            validatesWith={(val) => val === expectedValue}>
            Error Message
          </FormGuard>
          <textarea id='theInput' name='theInput' />
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );

      const input = getByLabelText('Test:', container);
      const submit = getByText('Submit', container);

      fireEvent.change(input, { target: { value: 'Some Text' } });
      fireEvent.click(submit);

      expect(onSubmit.mock.calls.length).toBe(0);
    
      fireEvent.change(input, { target: { value: expectedValue } });
      fireEvent.click(submit);

      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: expectedValue });
    });
  });

  describe('validators', () => {

    it('required', () => {
      expect(validators.required([])).toBe(false);
      expect(validators.required('')).toBe(false);
      expect(validators.required({})).toBe(false);
      expect(validators.required(undefined)).toBe(false);
      expect(validators.required(null)).toBe(false);
      expect(validators.required('Hello')).toBe(true);
      expect(validators.required(['Hello'])).toBe(true);
      expect(validators.required(4)).toBe(true);
    });

    it('email', () => {
      expect(validators.email('Hello')).toBe(false);
      expect(validators.email('something@something')).toBe(false);
      expect(validators.email('something@something.co')).toBe(true);
      expect(validators.email('something@something.co.uk')).toBe(true);
      expect(validators.email('something@something.com')).toBe(true);
      expect(validators.email('something+else@something.com')).toBe(true);
      expect(validators.email('some_th.ing+e.l.se@www.some-thing.com')).toBe(true);
    });

    it('phone', () => {
      expect(validators.phone('Hello')).toBe(false);
      expect(validators.phone('123232123')).toBe(false);
      expect(validators.phone('333')).toBe(false);
      expect(validators.phone('1234567890')).toBe(true);
      expect(validators.phone('123.453.4345')).toBe(true);
      expect(validators.phone('123-453-4345')).toBe(true);
      expect(validators.phone('123 453 4345')).toBe(true);
      expect(validators.phone('123.453-4345')).toBe(true);
      expect(validators.phone('+11 123.453-4345')).toBe(true);
      expect(validators.phone('+11123.453-4345')).toBe(true);
      expect(validators.phone('+1 123.453-4345')).toBe(true);
      expect(validators.phone('+1123 4534345')).toBe(true); 
    });

    it('minLength', () => {
      expect(validators.minLength(10)('Hello')).toBe(false);
      expect(validators.minLength(10)('123456789')).toBe(false);
      expect(validators.minLength(4)('333')).toBe(false);
      expect(validators.minLength(10)('1234567890')).toBe(true);
      expect(validators.minLength(5)('123456')).toBe(true);
    });

    it('maxLength', () => {
      expect(validators.maxLength(10)('Hello')).toBe(true);
      expect(validators.maxLength(10)('123456789')).toBe(true);
      expect(validators.maxLength(4)('333')).toBe(true);
      expect(validators.maxLength(10)('1234567890')).toBe(true);
      expect(validators.maxLength(10)('12345678901')).toBe(false);
      expect(validators.maxLength(5)('123456')).toBe(false);
    });
  });
});
