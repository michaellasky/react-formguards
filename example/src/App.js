import React, { Component } from 'react'
import ExampleBasic from './examples/example-basic';
import ExampleFunction from './examples/example-function';
import ExampleMultipleWatches from './examples/example-multiple-watches';

const App = () => {
    return (
      <>
      <section>
        <h1>react-formguards</h1>
        <h3>A simple, declarative approach to client side validation.</h3>

        <div className='example'>
          <div className='example-code'>
            <h2>Basic Validation</h2>
            <ol>
              <li>
                Just write your form like normal, replacing your &lt;form&gt; tag with a &lt;ValidatedForm&gt; tag.  Pass it an onSubmit function.
              </li>
              <li>
                Then add &lt;FormGuard&gt; tags anywhere you'd like a validation error to show up. <br /> Each &lt;FormGuard&gt; tag:  
                  <ul>
                    <li>Watches specified input(s) and validates as needed</li>
                    <li>Becomes a &lt;span&gt; in the DOM when the error shows</li>                  
                    <li>onSubmit won't be called until all the FormGuard's are satisfied</li>
                  </ul>

                  <p>Some basic validators are included -- required, email, phone, maxLength, and minLength</p>
              </li>
            </ol>
            <pre>{`
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

      <FormGuard watches='radioButtons' validatesWith={validators.required} >
          Pick One!  
      </FormGuard> 
      <input type='radio' name='radioButtons' value='Radio 1' id='example1-radioButtons1' />  
      <label htmlFor='example1-radioButtons1'>Radio 1</label>
      <input type='radio' name='radioButtons' value='Radio 2' id='example1-radioButtons2' />  
      <label htmlFor='example1-radioButtons2'>Radio 2</label>
      <input type='radio' name='radioButtons' value='Radio 3' id='example1-radioButtons3' />  
      <label htmlFor='example1-radioButtons3'>Radio 3</label>
      
      <input type='submit' value='Check the console for onSubmit' />
    </ValidatedForm>
          `}            
            </pre>
          </div>
          <div className='example-implementation'>
            <ExampleBasic />
          </div>
        </div>

        <div className='example'>
          <div className='example-code'>
            <h2>Custom Validation Functions</h2>
            <p>Just pass a function to validatesWith to use your own validation functions.</p>
            <pre>
            {`
    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>

      <label htmlFor='example2-fzappa'>Must be Frank Zappa:</label>
      <FormGuard watches='fzappa' validatesWith={ val => val === 'Frank Zappa' } >
          Value must be "Frank Zappa"
      </FormGuard> 
      <input type='text' name='fzappa' id='example2-fzappa' />  
      
      <input type='submit' value='Check the console for onSubmit' />
    </ValidatedForm>
            `}            
            </pre>
          </div>
          <div className='example-implementation'>
            <ExampleFunction />
          </div>
        </div>

        <div className='example'>
          <div className='example-code'>
            <h2>Guarding Multiple Form Elements with one FormGuard</h2>
            <p>A FormGuard can watch multiple elements by passing an array to the <i>watches</i> prop</p>
            <p>In this example the <i>validateTwoInputs</i> function requires that either <i>input1</i> OR <i>input2</i> is filled in.</p>
            <pre>
            {`
    function validateTwoInputs (input1, input2) {
      return (input1 && input1.length > 0) || 
             (input2 && input2.length > 0);
    }

    [...]

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
            `}            
            </pre>
          </div>
          <div className='example-implementation'>
            <ExampleMultipleWatches />
          </div>
        </div>
        
      </section>
      </>
    );
}

export default App;