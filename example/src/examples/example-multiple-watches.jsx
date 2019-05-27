import React from 'react';
import ValidatedForm, { FormGuard } from 'react-formguards'

const ExampleMultipleWatches = () => {

    function validateTwoInputs (input1, input2) {
        return (input1 && input1.length > 0) || 
               (input2 && input2.length > 0);
    }

    return (
        <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>

            <label htmlFor='example3-input1'>Input 1:</label>
            <input type='text' name='input1' id='example3-input1' />  

            <FormGuard 
                watches={['input1', 'input2']} 
                validatesWith={validateTwoInputs} >
                
                Either input 1 OR input 2 is required.
            </FormGuard> 

            <label htmlFor='example3-input2'>Input 2:</label>
            <input type='text' name='input2' id='example3-input2' />  

            <input type='submit' value='Check the console for onSubmit' />
        </ValidatedForm>
    );
}

export default ExampleMultipleWatches;