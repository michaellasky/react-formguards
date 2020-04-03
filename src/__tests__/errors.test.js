/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
import { ValidatedForm, FormGuard } from '../index';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

afterEach(cleanup);

describe('Shows error message when input is invalid', () => {

    test('<input type="text" />', () => {
    
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

    test('<select />', () => {

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

    test('<select multiple />', () => {

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
      
      userEvent.selectOptions(select, '1');
      
      fireEvent.change(select);
      expect(queryByText('Error Message', container)).toBe(null);
    });

    test('<input type="radio" />', () => {

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

    test('<input type="checkbox" />', () => {

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

    test('<textarea />', () => {

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