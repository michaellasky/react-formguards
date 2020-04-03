/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
import { ValidatedForm, FormGuard } from '../index';
import { render, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';

afterEach(cleanup);

describe('ValidatedForm', () => {

  test('is truthy', () => {
    expect(ValidatedForm).toBeTruthy()
  });

  test('FormGuards can watch multiple parameters by passing an array to watches', () => {

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


  test('Sets css class input-invalid upon initial blur with invalid input', () => {
    const onSubmit = jest.fn();

    const { getByText, queryByText, getByLabelText, container } = render(
      <ValidatedForm onSubmit={onSubmit}>
        <FormGuard
          watches={'theInput'}
          validatesWith={val => false }>
          Error Message
        </FormGuard>
        <label htmlFor='theInput'>Test:</label>
        <input type='text' id='theInput' name='theInput' />

        <input type='submit' value='Submit' />
      </ValidatedForm>
    );
    const input = getByLabelText('Test:', container);
    expect(input.className).toBe('');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Some Text' } });
    fireEvent.blur(input);

    expect(input.className.trim()).toBe('input-invalid');
  });
});
