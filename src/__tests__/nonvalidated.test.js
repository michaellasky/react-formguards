/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
import { ValidatedForm, FormGuard } from '../index';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

afterEach(cleanup);

describe('Passes non-validated input values through onSubmit', () => {

    test('<input type=text />', () => {

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
  
    test('<select />', () => {

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
  
    test('<select-multiple />', () => { 

      const expectedValues = ['Some Text', 'Some Different Text'];
      const onSubmit = jest.fn();
  
      const { getByText, getByLabelText, container } = render(
        <ValidatedForm onSubmit={onSubmit}>
          <label htmlFor='theInput'>Test:</label>
          <select multiple id='theInput' name='theInput'>
            <option value={expectedValues[0]}>Some Text</option>
            <option value={expectedValues[1]}>Some Different Text</option>
            <option value='Some Other Text'>Some Other Text</option>
          </select>
          <input type='submit' value='Submit' />
        </ValidatedForm>
      );
  
      const select = getByLabelText('Test:', container);
      const submit = getByText('Submit', container);
  
      userEvent.selectOptions(select, expectedValues);
  
      // FIXME: Do we really need to call change here?
      fireEvent.change(select);
      fireEvent.click(submit);
  
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][1]).toEqual({ theInput: expectedValues });
    });
  
    test('<input type="radio" />', () => {

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
  
    test('<input type="checkbox" />', () => {

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

    test('<textarea />', () => {

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
