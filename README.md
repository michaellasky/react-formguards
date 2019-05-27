# react-formguards

> Simple client side form validation

[![NPM](https://img.shields.io/npm/v/react-formguards.svg)](https://www.npmjs.com/package/react-formguards) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-formguards
```

## Usage
Check out the [Live Examples!](https://nuclearhorsestudios.github.io/react-formguards/)

Validation with react-formguards couldn't be simpler.  Just replace your <form> tag with <ValidatedForm>, passing an onSubmit callback.  Then add a <FormGuard> tags anwhere you'd like validation errors to appear.  The FormGuards handle everything else for you.
```jsx
import React from 'react';
import { ValidatedForm, FormGuard, validators } from 'react-formguards'

const ExampleBasic = () => {

    return (
        <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>
            <label htmlFor='example1-name'>Name:</label>
            <input type='text' name='name' id='example1-name' />

            <label htmlFor='example1-email'>Email:</label>
            <FormGuard watches='email' validatesWith={validators.required} >
                Email is required  
            </FormGuard> 
            <FormGuard watches='email' validatesWith={validators.email} >
                Please enter a valid email address  
            </FormGuard> 
            <input type='email' name='email' id='example1-email' />  
            
            <label htmlFor='example1-phone'>Telephone:</label>
            <FormGuard watches='phone' validatesWith={validators.phone} >
                Please enter a valid phone number  
            </FormGuard> 
            <input type='tel' name='phone' id='example1-phone' />  

            <label htmlFor='example1-comments'>Comments:</label>
            <FormGuard watches='comments' validatesWith={validators.maxLength(80)} >
                Maximum length (80 characters) exceeded
            </FormGuard> 
            <textarea name='comments' id='example1-comments' />  
            
            <input type='submit' value='Check the console for onSubmit' />
        </ValidatedForm>
    );
}

export default ExampleBasic;
```

## License

MIT © [NuclearHorseStudios](https://github.com/NuclearHorseStudios)
