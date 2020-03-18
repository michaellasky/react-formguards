/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
import { ValidatedForm, FormGuard, validators } from '../index';
import { render, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';

afterEach(cleanup);

describe('Fieldsets', () => {

  describe('Sets initial values equal to the formVals prop', () => {

    describe('With useFieldsets=true', () => {
      test('<input type=text />', () => {

        const onSubmit = jest.fn();
        const expected = {
          input1: '1', 
          fs: { 
            input2: '2'
          }
        };
        
        const { getByTestId, getByText, container } = render(
          <ValidatedForm useFieldsets={true} onSubmit={onSubmit} formVals={expected}>
            <label htmlFor='input1'>Test 1:</label>
            <input type='text' data-testid="input1" id='input1' name='input1' />
          
            <fieldset name="fs">
              <label htmlFor='input2'>Test 2:</label>
              <input type='text' data-testid="input2" id='input2' name='input2' />
            </fieldset>
          
            <input type='submit' value='Submit' />
          </ValidatedForm>
        );
  
        const input1 = getByTestId('input1');
        const input2 = getByTestId('input2');
        const submit = getByText('Submit', container);
        expect(input1.value).toBe(expected.input1);
        expect(input2.value).toBe(expected.fs.input2);
        fireEvent.click(submit);
    
        expect(onSubmit.mock.calls.length).toBe(1);
        expect(onSubmit.mock.calls[0][1]).toEqual(expected);
      });

      test('<select />', () => {
  
        const expectedValue = { 
          input1: 'Some input text', 
          fs: { 
            select1: 'Some Different Text' 
        } };
        
        const onSubmit = jest.fn();
    
        const { getByTestId, getByText, container } = render(
          <ValidatedForm onSubmit={onSubmit} useFieldsets={true} formVals={expectedValue}>
            <label htmlFor="input1">Input 1:</label>
            <input data-testid='input1' type="text" name="input1" id="input1" />

            <fieldset name="fs">
              <label htmlFor='select1'>Select 1:</label>
              <select data-testid='select1' id='select1' name='select1'>
                <option value='Some Text'>Some Text</option>
                <option value='Some Different Text'>Some Different Text</option>
                <option value='Some Other Text'>Some Other Text</option>
              </select>
              
            </fieldset>
            <input type='submit' value='Submit' />
          </ValidatedForm>
        );
        const input1 = getByTestId('input1');
        const select1 = getByTestId('select1');
        
        expect(input1.value).toBe(expectedValue.input1);
        expect(select1.value).toBe(expectedValue.fs.select1);

        const submit = getByText('Submit', container);
        fireEvent.click(submit);
    
        expect(onSubmit.mock.calls.length).toBe(1);
        expect(onSubmit.mock.calls[0][1]).toEqual(expectedValue);
      });

      test('<select multiple />', () => {
  
        const expectedValue = { 
          input1: 'Some input text', 
          fs: { 
            select1: ['Some Different Text', 'Some Other Text'] 
        } };
        
        const onSubmit = jest.fn();
    
        const { getByTestId, getByText, container } = render(
          <ValidatedForm onSubmit={onSubmit} useFieldsets={true} formVals={expectedValue}>
            <label htmlFor="input1">Input 1:</label>
            <input data-testid='input1' type="text" name="input1" id="input1" />

            <fieldset name="fs">
              <label htmlFor='select1'>Select 1:</label>
              <select multiple data-testid='select1' id='select1' name='select1'>
                <option value='Some Text'>Some Text</option>
                <option value='Some Different Text'>Some Different Text</option>
                <option value='Some Other Text'>Some Other Text</option>
              </select>
              
            </fieldset>
            <input type='submit' value='Submit' />
          </ValidatedForm>
        );
        const input1 = getByTestId('input1');
        
        expect(input1.value).toBe(expectedValue.input1);
        
        const submit = getByText('Submit', container);
        fireEvent.click(submit);
    
        expect(onSubmit.mock.calls.length).toBe(1);
        expect(onSubmit.mock.calls[0][1]).toEqual(expectedValue);
      });

      test('<input type="radio" />', () => {
  
        const expectedValue = { input1: '1', fs: { radio1: 'Value 2' } };
        const onSubmit = jest.fn();
        const { getByText, container } = render(
          <ValidatedForm useFieldsets={true} onSubmit={onSubmit} formVals={expectedValue}>
            
            <label htmlFor="input1">Input 1:</label>
            <input data-testid='input1' type="text" name="input1" id="input1" />
            
            <fieldset name="fs">
                <label htmlFor='value_1'>Value 1</label>
                <input type='radio' id='value_1' name='radio1' value='Value 1' />
                <label htmlFor='value_2'>Value 2</label>
                <input type='radio' id='value_2' name='radio1' value='Value 2' />
                <label htmlFor='value_3'>Value 3</label>
                <input type='radio' id='value_3' name='radio1' value='Value 3' />

            </fieldset>
            <input type='submit' value='Submit' />
          </ValidatedForm>          
        );
    
        const submit = getByText('Submit', container);
    
        fireEvent.click(submit);
    
        expect(onSubmit.mock.calls.length).toBe(1);
        expect(onSubmit.mock.calls[0][1]).toEqual(expectedValue);
      });

      test('<input type="checkbox" />', () => {

        const onSubmit = jest.fn();
        const expectedValues = { input1: '1', fs: { checkbox1: true, checkbox3: true } };
  
        const { getByTestId, getByText, container } = render(
          <ValidatedForm useFieldsets={true} formVals={expectedValues} onSubmit={onSubmit}>
                        
            <label htmlFor="input1">Input 1:</label>
            <input data-testid='input1' type="text" name="input1" id="input1" />

            <fieldset name="fs">
              <label htmlFor='value_1'>Value 1</label>
              <input data-testid='checkbox1' type='checkbox' id='value_1' name='checkbox1' />
              <label htmlFor='value_2'>Value 2</label>
              <input data-testid='checkbox2' type='checkbox' id='value_2' name='checkbox2' />
              <label htmlFor='value_3'>Value 3</label>
              <input data-testid='checkbox3' type='checkbox' id='value_3' name='checkbox3' />
              <input type='submit' value='Submit' />
            </fieldset>
          </ValidatedForm>
        );
    
        const cb1 = getByTestId('checkbox1');
        const cb2 = getByTestId('checkbox2');
        const cb3 = getByTestId('checkbox3');
        expect(cb1.value).toBe("true");
        expect(cb2.value).toBe("");
        expect(cb3.value).toBe("true");
        const submit = getByText('Submit', container);
        
        fireEvent.submit(submit);
    
        expect(onSubmit.mock.calls.length).toBe(1);
        expect(onSubmit.mock.calls[0][1]).toEqual(expectedValues);
      });

      test('<textarea />', () => {

        const onSubmit = jest.fn();
        const expected = {
          input1: '1', 
          fs: { 
            textarea1: '2'
          }
        };
        
        const { getByTestId, getByText, container } = render(
          <ValidatedForm useFieldsets={true} onSubmit={onSubmit} formVals={expected}>
            <label htmlFor='input1'>Test 1:</label>
            <input type='text' data-testid="input1" id='input1' name='input1' />
          
            <fieldset name="fs">
              <label htmlFor='input2'>Test 2:</label>
              <textarea type='text' data-testid="textarea1" id='textarea1' name='textarea1' />
            </fieldset>
          
            <input type='submit' value='Submit' />
          </ValidatedForm>
        );
  
        const input1 = getByTestId('input1');
        const textarea1 = getByTestId('textarea1');
        const submit = getByText('Submit', container);
        expect(input1.value).toBe(expected.input1);
        expect(textarea1.value).toBe(expected.fs.textarea1);
        fireEvent.click(submit);
    
        expect(onSubmit.mock.calls.length).toBe(1);
        expect(onSubmit.mock.calls[0][1]).toEqual(expected);
      });
  
    });
    
    describe('With useFieldsets=false', () => {
      test('<input type=text />', () => {

        const onSubmit = jest.fn();
        const expected = {
          input1: '1', 
          input2: '2'
        };
        
        const { getByTestId, getByText, container } = render(
          <ValidatedForm useFieldsets={false} onSubmit={onSubmit} formVals={expected}>
            <label htmlFor='input1'>Test 1:</label>
            <input type='text' data-testid="input1" id='input1' name='input1' />
          
            <fieldset name="fs">
              <label htmlFor='input2'>Test 2:</label>
              <input type='text' data-testid="input2" id='input2' name='input2' />
            </fieldset>
          
            <input type='submit' value='Submit' />
          </ValidatedForm>
        );
  
        const input1 = getByTestId('input1');
        const input2 = getByTestId('input2');
        const submit = getByText('Submit', container);
        expect(input1.value).toBe(expected.input1);
        expect(input2.value).toBe(expected.input2);
        fireEvent.click(submit);
    
        expect(onSubmit.mock.calls.length).toBe(1);
        expect(onSubmit.mock.calls[0][1]).toEqual(expected);
      });

      test('<select />', () => {
  
        const expectedValue = { 
          input1: 'Some input text', 
          select1: 'Some Different Text' 
        };
        
        const onSubmit = jest.fn();
    
        const { getByTestId, getByText, container } = render(
          <ValidatedForm useFieldsets={false} onSubmit={onSubmit} formVals={expectedValue}>
            <label htmlFor="input1">Input 1:</label>
            <input data-testid='input1' type="text" name="input1" id="input1" />

            <fieldset name="fs">
              <label htmlFor='select1'>Select 1:</label>
              <select data-testid='select1' id='select1' name='select1'>
                <option value='Some Text'>Some Text</option>
                <option value='Some Different Text'>Some Different Text</option>
                <option value='Some Other Text'>Some Other Text</option>
              </select>
              
            </fieldset>
            <input type='submit' value='Submit' />
          </ValidatedForm>
        );
        const input1 = getByTestId('input1');
        const select1 = getByTestId('select1');
        
        expect(input1.value).toBe(expectedValue.input1);
        expect(select1.value).toBe(expectedValue.select1);

        const submit = getByText('Submit', container);
        fireEvent.click(submit);
    
        expect(onSubmit.mock.calls.length).toBe(1);
        expect(onSubmit.mock.calls[0][1]).toEqual(expectedValue);
      });

      test('<select multiple />', () => {
  
        const expectedValue = { 
          input1: 'Some input text', 
          select1: ['Some Different Text', 'Some Other Text'] 
        };
        
        const onSubmit = jest.fn();
    
        const { getByTestId, getByText, container } = render(
          <ValidatedForm useFieldsets={false} onSubmit={onSubmit} formVals={expectedValue}>
            <label htmlFor="input1">Input 1:</label>
            <input data-testid='input1' type="text" name="input1" id="input1" />

            <fieldset name="fs">
              <label htmlFor='select1'>Select 1:</label>
              <select multiple data-testid='select1' id='select1' name='select1'>
                <option value='Some Text'>Some Text</option>
                <option value='Some Different Text'>Some Different Text</option>
                <option value='Some Other Text'>Some Other Text</option>
              </select>
              
            </fieldset>
            <input type='submit' value='Submit' />
          </ValidatedForm>
        );
        const input1 = getByTestId('input1');
        
        expect(input1.value).toBe(expectedValue.input1);
        
        const submit = getByText('Submit', container);
        fireEvent.click(submit);
    
        expect(onSubmit.mock.calls.length).toBe(1);
        expect(onSubmit.mock.calls[0][1]).toEqual(expectedValue);
      });

      test('<input type="radio" />', () => {
  
        const expectedValue = { input1: '1', radio1: 'Value 2' };
        const onSubmit = jest.fn();
        const { getByText, container } = render(
          <ValidatedForm useFieldsets={false} onSubmit={onSubmit} formVals={expectedValue}>
            
            <label htmlFor="input1">Input 1:</label>
            <input data-testid='input1' type="text" name="input1" id="input1" />
            
            <fieldset name="fs">
                <label htmlFor='value_1'>Value 1</label>
                <input type='radio' id='value_1' name='radio1' value='Value 1' />
                <label htmlFor='value_2'>Value 2</label>
                <input type='radio' id='value_2' name='radio1' value='Value 2' />
                <label htmlFor='value_3'>Value 3</label>
                <input type='radio' id='value_3' name='radio1' value='Value 3' />

            </fieldset>
            <input type='submit' value='Submit' />
          </ValidatedForm>          
        );
    
        const submit = getByText('Submit', container);
    
        fireEvent.click(submit);
    
        expect(onSubmit.mock.calls.length).toBe(1);
        expect(onSubmit.mock.calls[0][1]).toEqual(expectedValue);
      });

      test('<input type="checkbox" />', () => {

        const onSubmit = jest.fn();
        const expectedValues = { input1: '1', checkbox1: true, checkbox3: true };
  
        const { getByTestId, getByText, container } = render(
          <ValidatedForm useFieldsets={false} formVals={expectedValues} onSubmit={onSubmit}>
                        
            <label htmlFor="input1">Input 1:</label>
            <input data-testid='input1' type="text" name="input1" id="input1" />

            <fieldset name="fs">
              <label htmlFor='value_1'>Value 1</label>
              <input data-testid='checkbox1' type='checkbox' id='value_1' name='checkbox1' />
              <label htmlFor='value_2'>Value 2</label>
              <input data-testid='checkbox2' type='checkbox' id='value_2' name='checkbox2' />
              <label htmlFor='value_3'>Value 3</label>
              <input data-testid='checkbox3' type='checkbox' id='value_3' name='checkbox3' />
              <input type='submit' value='Submit' />
            </fieldset>
          </ValidatedForm>
        );
    
        const cb1 = getByTestId('checkbox1');
        const cb2 = getByTestId('checkbox2');
        const cb3 = getByTestId('checkbox3');
        expect(cb1.value).toBe("true");
        expect(cb2.value).toBe("");
        expect(cb3.value).toBe("true");
        const submit = getByText('Submit', container);
        
        fireEvent.submit(submit);
    
        expect(onSubmit.mock.calls.length).toBe(1);
        expect(onSubmit.mock.calls[0][1]).toEqual(expectedValues);
      });

      test('<textarea />', () => {

        const onSubmit = jest.fn();
        const expected = {
          input1: '1', 
          textarea1: '2'
        };
        
        const { getByTestId, getByText, container } = render(
          <ValidatedForm useFieldsets={false} onSubmit={onSubmit} formVals={expected}>
            <label htmlFor='input1'>Test 1:</label>
            <input type='text' data-testid="input1" id='input1' name='input1' />
          
            <fieldset name="fs">
              <label htmlFor='input2'>Test 2:</label>
              <textarea type='text' data-testid="textarea1" id='textarea1' name='textarea1' />
            </fieldset>
          
            <input type='submit' value='Submit' />
          </ValidatedForm>
        );
  
        const input1 = getByTestId('input1');
        const textarea1 = getByTestId('textarea1');
        const submit = getByText('Submit', container);
        expect(input1.value).toBe(expected.input1);
        expect(textarea1.value).toBe(expected.textarea1);
        fireEvent.click(submit);
    
        expect(onSubmit.mock.calls.length).toBe(1);
        expect(onSubmit.mock.calls[0][1]).toEqual(expected);
      });
    });
  });

  test('Smooshes values into fieldset objects when useFieldsets prop is true', () => {

    const expectedValue = {
      person: {
        name: "Frank Zappa",
        "contact-info": {
          email: "frank@zappa.com",
          phone: '1232322332'    
        }
      },
      comments: "Hello"
    };
    
    const onSubmit = jest.fn();

    const { getByText, getByLabelText, container } = render(
      <ValidatedForm useFieldsets={true} onSubmit={onSubmit}>
        
        <fieldset name="person">
    
          <label htmlFor='example7-name'>Name:</label>
          <FormGuard watches='name' validatesWith={validators.required} >
              Name is required
          </FormGuard>
          <input type='text' name='name' id='example7-name' />
          
          <fieldset name="contact-info">
            <legend>Contact Info</legend>
      
            <label htmlFor='example7-email'>Email:</label>
            <FormGuard watches='email' validatesWith={validators.required} >
                      Email is required
            </FormGuard>
            <FormGuard watches='email' validatesWith={validators.email} >
                      Please enter a valid email address
            </FormGuard>
            <input type='email' name='email' id='example7-email' />

            <label htmlFor='example7-phone'>Telephone:</label>
            <FormGuard watches='phone' validatesWith={validators.phone} >
                      Please enter a valid phone number
            </FormGuard>
            <input type='tel' name='phone' id='example7-phone' />

          </fieldset>
        </fieldset>
        
        <label htmlFor='example7-comments'>Comments:</label>
        <FormGuard watches='comments' validatesWith={validators.maxLength(80)} >
                  Maximum length (80 characters) exceeded
        </FormGuard>
        <textarea name='comments' id='example7-comments' />

        <input type='submit' value='Submit' />
      </ValidatedForm>
    );

    const name = getByLabelText('Name:', container);
    const email = getByLabelText('Email:', container);
    const phone = getByLabelText('Telephone:', container);
    const comments = getByLabelText('Comments:', container);
    const submit = getByText('Submit', container);

    fireEvent.click(submit);

    expect(onSubmit.mock.calls.length).toBe(0);

    fireEvent.change(name, { target: { value: expectedValue.person.name } });
    fireEvent.change(email, { target: { value: expectedValue.person['contact-info'].email } });
    fireEvent.change(phone, { target: { value: expectedValue.person['contact-info'].phone } });
    fireEvent.change(comments, { target: { value: expectedValue.comments } });
    fireEvent.click(submit);

    expect(onSubmit.mock.calls.length).toBe(1);

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onSubmit.mock.calls[0][1]).toEqual(expectedValue);
  });

  test('Does not smoosh values into fieldset objects when useFieldsets prop is true', () => {

    const expectedValue = {
      name: "Frank Zappa",
      email: "frank@zappa.com",
      phone: '1232322332',
      comments: "Hello"
    };
    
    const onSubmit = jest.fn();

    const { getByText, getByLabelText, container } = render(
      <ValidatedForm useFieldsets={false} onSubmit={onSubmit}>
        
        <fieldset name="person">
    
          <label htmlFor='example7-name'>Name:</label>
          <FormGuard watches='name' validatesWith={validators.required} >
              Name is required
          </FormGuard>
          <input type='text' name='name' id='example7-name' />
          
          <fieldset name="contact-info">
            <legend>Contact Info</legend>
      
            <label htmlFor='example7-email'>Email:</label>
            <FormGuard watches='email' validatesWith={validators.required} >
                      Email is required
            </FormGuard>
            <FormGuard watches='email' validatesWith={validators.email} >
                      Please enter a valid email address
            </FormGuard>
            <input type='email' name='email' id='example7-email' />

            <label htmlFor='example7-phone'>Telephone:</label>
            <FormGuard watches='phone' validatesWith={validators.phone} >
                      Please enter a valid phone number
            </FormGuard>
            <input type='tel' name='phone' id='example7-phone' />

          </fieldset>
        </fieldset>
        
        <label htmlFor='example7-comments'>Comments:</label>
        <FormGuard watches='comments' validatesWith={validators.maxLength(80)} >
                  Maximum length (80 characters) exceeded
        </FormGuard>
        <textarea name='comments' id='example7-comments' />

        <input type='submit' value='Submit' />
      </ValidatedForm>
    );

    const name = getByLabelText('Name:', container);
    const email = getByLabelText('Email:', container);
    const phone = getByLabelText('Telephone:', container);
    const comments = getByLabelText('Comments:', container);
    const submit = getByText('Submit', container);

    fireEvent.click(submit);

    expect(onSubmit.mock.calls.length).toBe(0);

    fireEvent.change(name, { target: { value: expectedValue.name } });
    fireEvent.change(email, { target: { value: expectedValue.email } });
    fireEvent.change(phone, { target: { value: expectedValue.phone } });
    fireEvent.change(comments, { target: { value: expectedValue.comments } });
    fireEvent.click(submit);

    expect(onSubmit.mock.calls.length).toBe(1);

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onSubmit.mock.calls[0][1]).toEqual(expectedValue);
  });
});
