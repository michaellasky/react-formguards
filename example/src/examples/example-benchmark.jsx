import React from 'react';
import { ValidatedForm, FormGuard, validators } from 'react-formguards'

const ExampleBenchmark = () => {
  return (
    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>

      {[...Array(200).keys()].map(idx =>
        <div key={idx}>
          <label htmlFor={`example2-input-${idx}`}>Label {idx}:</label>
          <FormGuard watches={`input-${idx}`} validatesWith={validators.required} >
                Value is Required
          </FormGuard>
          <input type='text' name={`input-${idx}`} id={`example6-input-${idx}`} />
        </div>
      )}
      <input type='submit' value='Check the console for onSubmit' />
    </ValidatedForm>
  );
}

export default ExampleBenchmark;
