import React from 'react';
import { ValidatedForm, FormGuard, validators } from 'react-formguards'

const ExampleStyle = () => {

    return (
        <ValidatedForm id='example-style' onSubmit={(e, formVals) => console.log(formVals)}>

            <label htmlFor='example1-email'>Email:</label>
            <FormGuard watches='email' validatesWith={validators.required} >
                Email is required  
            </FormGuard> 
            <FormGuard watches='email' validatesWith={validators.email} >
                Please enter a valid email address  
            </FormGuard> 
            <input type='email' name='email' id='example1-email' />  
            
            <input type='submit' value='Check the console for onSubmit' />
        </ValidatedForm>
    );
}

export default ExampleStyle;