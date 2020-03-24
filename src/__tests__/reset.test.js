/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
import { ValidatedForm, FormGuard, validators } from '../index';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

afterEach(cleanup);

describe('reset', () => {
  test('passes a function onSubmit that resets the form when called', () => {

    const onSubmit = jest.fn((_, __, reset) => reset());

    const { getByTestId } = render(
      <ValidatedForm onSubmit={onSubmit}>
        <FormGuard
          watches={'theInput'}
          validatesWith={val => val === 'Some text'}>
          Error Message
        </FormGuard>
        <input type='text' data-testid='input1' id='input1' name='theInput' />
        <input type='text' data-testid='input2' id='input2' name='theInput2' />
        <input type='checkbox' name='checkBox1' data-testid='check1' id='example1-checkbox1' />
        <input type='checkbox' name='checkBox2' data-testid='check2' id='example1-checkbox2' />
        <input type='submit' data-testid='submit' value='Submit' />
      </ValidatedForm>
    );

    const input1 = getByTestId('input1');
    const input2 = getByTestId('input2');
    const check1 = getByTestId('check1');
    const check2 = getByTestId('check2');
    const submit = getByTestId('submit');

    fireEvent.change(input1, { target: { value: 'Some text' } });
    fireEvent.change(input2, { target: { value: 'Some other text' } });
    fireEvent.click(check1);
    
    expect(input1.value).toBe('Some text');
    expect(input2.value).toBe('Some other text');
    expect(check1.checked).toBe(true);
    expect(check2.checked).toBe(false);
    
    fireEvent.click(submit);
    
    expect(input1.value).toBe('');
    expect(input2.value).toBe('');
    expect(check1.checked).toBe(false);
    expect(check2.checked).toBe(false);
    
  });  
});
