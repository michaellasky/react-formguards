/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
import { ValidatedForm, FormGuard } from '../index';
import { render, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';

afterEach(cleanup);

describe('Sets initial values equal to the formVals prop', () => {

test('<input type=text />', () => {

    const onSubmit = jest.fn();
    const { getByText, container } = render(
    <ValidatedForm onSubmit={onSubmit} formVals={{input1: '1', input2: '2'}}>
        <label htmlFor='input1'>Test 1:</label>
        <input type='text' id='input1' name='input1' />

        <label htmlFor='input2'>Test 2:</label>
        <input type='text' id='input2' name='input2' />

        <input type='submit' value='Submit' />
    </ValidatedForm>
    );

    const submit = getByText('Submit', container);
    fireEvent.click(submit);

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onSubmit.mock.calls[0][1]).toEqual({ input1: '1', input2: '2' });
});

test('<select />', () => {

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

test('<select multiple />', () => {

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

test('<input type="radio" />', () => {

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

test('<input type="checkbox" />', () => {

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

test('<textarea />', () => {

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