import React from 'react';
import { ValidatedForm, FormGuard } from 'react-formguards'

const ExampleFunction = () => {

    return (
        <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>

            <label htmlFor='example2-fzappa'>Must be Frank Zappa:</label>
            <FormGuard watches='fzappa' validatesWith={val => val === 'Frank Zappa'} >
                Value must be "Frank Zappa"
            </FormGuard> 
            <input type='text' name='fzappa' id='example2-fzappa' />  
            
            <input type='submit' value='Check the console for onSubmit' />
        </ValidatedForm>
    );
}

export default ExampleFunction;