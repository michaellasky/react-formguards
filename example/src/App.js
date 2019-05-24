import React, { Component } from 'react'

import ValidatedForm, { FormGuard } from 'react-formguards'

export default class App extends Component {
  render () {
    const onSubmit = (e, formVals) => {
      console.log('formVals', formVals);
    }

    return (
      <div>
        <ValidatedForm onSubmit={onSubmit} >
            <label htmlFor='value_111'>Value 1</label>
            <input type='radio' id='value_111' name='theInput' value="value_1" />
            <label htmlFor='value_222'>Value 2</label>
            <input type='radio' id='value_222' name='theInput' value="value_2" />
            <label htmlFor='value_333'>Value 3</label>
            <input type='radio' id='value_333' name='theInput' value="value_3" />

            <br />
            <label htmlFor='theInput2'>Test2:</label>
            <FormGuard
              watches='theInput2'
              validatesWith={(val) => val === 'Hello'}>
    
              Error Message
            </FormGuard>
            <input type='text' id='theInput2' name='theInput2' />

            <br />
            <label htmlFor='theInput'>Test3:</label>
            <FormGuard
              watches='theInput3'
              validatesWith={val => val !== undefined && val.length > 0}>
              Error Message
            </FormGuard>
            <select id='theInput3' name='theInput3'>
              <option value='1'>1</option>
              <option value='2'>2</option>
            </select>

            <br />
            <FormGuard
              watches='theInput41'
              validatesWith={(val) => val === '1' || val === '2'}>
              Error Message
            </FormGuard>
            <label htmlFor='theInput41'>Test41:</label>
            <input type='checkbox' id='theInput41' name='theInput41' value='1' />
            <label htmlFor='theInput42'>Test42:</label>
            <input type='checkbox' id='theInput42' name='theInput42' value='2' />
        
            <input type='submit' value='Submit' />
        </ValidatedForm>
      </div>
    )
  }
}
