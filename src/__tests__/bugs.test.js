/* eslint-disable padded-blocks */
import { ValidatedForm, FormGuard, validators } from '../index';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

afterEach(cleanup);

describe('Bugs', () => {

  test('Allows form elements and guards to be arbitrarily nested in other dom nodes', () => {

    const expectedValue = 'Expected Value';
    const onSubmit = jest.fn();

    const { getByText, queryByText, getByLabelText, container } = render(
      <ValidatedForm onSubmit={onSubmit}>
        <span>
          <label htmlFor='theInput'>Test:</label>
          <br />
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

  test('When one input is watched by multiple FormGuards, the latter being valid does not overwrite the previous being invalid', () => {

    const onSubmit = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <ValidatedForm onSubmit={onSubmit}>
        <span>
          <label htmlFor='theInput'>Test:</label>
          <FormGuard
            watches='theInput'
            validatesWith={val => val === 'Some Text'}>
            Error Message 1
          </FormGuard>
          <FormGuard
            watches='theInput'
            validatesWith={val => val === 'Some Other Text'}>
            Error Message 2
          </FormGuard>
          <input type='text' id='theInput' name='theInput' />
          <input type='submit' value='Submit' />
        </span>
      </ValidatedForm>
    );

    const input = getByLabelText('Test:', container);
    const submit = getByText('Submit');

    fireEvent.change(input, { target: { value: 'Some Text' } });
    expect(getByText('Error Message 2', container)).toBeTruthy();

    fireEvent.change(input, { target: { value: 'Some Other Text' } });
    expect(getByText('Error Message 1', container)).toBeTruthy();

    fireEvent.click(submit);
    expect(onSubmit.mock.calls.length).toBe(0);
  });
});
