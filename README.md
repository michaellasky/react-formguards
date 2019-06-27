# react-formguards
> Simple, declarative, client side form validation

[![NPM](https://img.shields.io/npm/v/react-formguards.svg)](https://www.npmjs.com/package/react-formguards) [![SIZE](https://img.shields.io/bundlephobia/min/react-formguards.svg)](https://www.npmjs.com/package/react-formguards) [![Build Status](https://travis-ci.com/michaellasky/react-formguards.svg?branch=master)](https://travis-ci.com/michaellasky/react-formguards) [![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors) 

## The Problem

Client side form validation is a pain in the butt.  Many solutions are complex, cumbersome, or both.  Form validation should be simple.

## The Solution

react-formguards is very easy to use.  It's also somewhat powerful.  Simple or complex validation rules can be declaratively defined with simple &lt;FormGuard&gt; tags.  Just add FormGuards to your form markup and you're done!     

## Install

```bash
npm install --save react-formguards
```

## Usage

* Replace your &lt;form&gt; tag with &lt;ValidatedForm&gt;, passing an onSubmit callback. 
  *(onSubmit is only called when all the FormGuard's are satisfied, which means the form is valid)*

* Add &lt;FormGuard&gt; tags anwhere you'd like validation errors to appear.  The FormGuards handle everything else for you.

Check out the [Live Examples](https://michaellasky.github.io/react-formguards/) to see it in action!

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

## Limitations 

Currently the maximum number of FormGuards per ValidatedForm is ~50.  This is because a state update is triggered for each one. With too many, react thinks it's an infinite loop and bails early.  This should be a temporary condition.  

## License

MIT © [Michael Lasky](https://github.com/NuclearHorseStudios)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/michaellasky"><img src="https://avatars2.githubusercontent.com/u/6646599?v=4" width="100px;" alt="Michael Lasky"/><br /><sub><b>Michael Lasky</b></sub></a><br /><a href="#infra-michaellasky" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/michaellasky/react-formguards/commits?author=michaellasky" title="Tests">⚠️</a> <a href="https://github.com/michaellasky/react-formguards/commits?author=michaellasky" title="Documentation">📖</a> <a href="#maintenance-michaellasky" title="Maintenance">🚧</a> <a href="https://github.com/michaellasky/react-formguards/commits?author=michaellasky" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
