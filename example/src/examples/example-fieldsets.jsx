import React, { useEffect, useState } from 'react';
import { ValidatedForm, FormGuard, validators } from 'react-formguards'

const ExampleFieldsets = () => {
  const [useFieldsets, setUseFieldsets] = useState(true);
  
  return (
    <>
    <form>
      <label htmlFor="useFieldsets">useFieldsets</label>
      <input type="checkbox" checked={useFieldsets} onChange={() => setUseFieldsets(!useFieldsets)} name="useFieldSets" id="useFieldsets" />
    </form>
    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)} useFieldsets={useFieldsets}>
      <fieldset name="person">
        <legend>Person</legend>
  
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

      <input type='submit' value='Check the console for onSubmit' />
    </ValidatedForm>
    </>
  );
}

export default ExampleFieldsets;
