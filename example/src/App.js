import React from 'react'
import ExampleBasic from './examples/example-basic';
import ExampleFunction from './examples/example-function';
import ExampleMultipleWatches from './examples/example-multiple-watches';
import ExampleStyle from './examples/example-style';
import ExampleValues from './examples/example-values';
import ExampleBenchmark from './examples/example-benchmark';
import ExampleFieldsets from './examples/example-fieldsets';

const App = () => {
  return (
    <>
      <section>
        <h1 id='top'>react-formguards</h1>
        <h3>A simple, declarative approach to client side validation.</h3>
        <span><a href='https://www.npmjs.com/package/react-formguards'>npm</a> | <a href='https://github.com/NuclearHorseStudios/react-formguards'>github</a></span>

        <ul>
          <li><a href='#basic'>Basic Validation</a></li>
          <li><a href='#custom'>Custom Validation Functions</a></li>
          <li><a href='#multiple'>Watching Multiple Elements With One FormGuard</a></li>
          <li><a href='#style'>Styling / CSS</a></li>
          <li><a href='#preset'>Passing Preset Values</a></li>
          <li><a href='#fieldsets'>Grouping data with useFieldsets</a></li>
          <li><a href='#benchmark'>Performance / Large Forms With Many Elements</a></li>
        </ul>

        <hr />

        <div id='basic' className='example'>
          <div className='example-code'>
            <h2>Basic Validation</h2>
            <a href='https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-basic.jsx'>Source</a>  -  <a href='#top'>Back to top</a>
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

    <br />
    <FormGuard
      watches={['checkBox1', 'checkBox2', 'checkBox3']}
      validatesWith={(cb1, cb2, cb3) => { return cb1 || cb2 || cb3}} >
              Pick One!
    </FormGuard>
    <input type='checkbox' name='checkBox1' id='example1-checkbox1' />
    <label htmlFor='example1-checkbox1'>Check 1</label>
    <input type='checkbox' name='checkBox2' id='example1-checkbox2' />
    <label htmlFor='example1-checkbox2'>Check 2</label>
    <input type='checkbox' name='checkBox3' id='example1-checkbox3' />
    <label htmlFor='example1-checkbox3'>Check 3</label>

    <input type='submit' value='Check the console for onSubmit' />
  </ValidatedForm>
          `}
            </pre>
          </div>
          <div className='example-implementation'>
            <ExampleBasic />
          </div>
        </div>
        <hr />
        <div id='custom' className='example'>
          <div className='example-code'>
            <h2>Custom Validation Functions</h2>
            <a href='https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-function.jsx'>Source</a>  -  <a href='#top'>Back to top</a>
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

        <hr />

        <div id='multiple' className='example'>
          <div className='example-code'>
            <h2>Guarding Multiple Form Elements with one FormGuard</h2>
            <a href='https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-multiple-watches.jsx'>Source</a>  -  <a href='#top'>Back to top</a>
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

        <hr />

        <div id='style' className='example'>
          <div className='example-code'>
            <h2>Styling / CSS</h2>
            <a href='https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-style.jsx'>Source</a>  -  <a href='#top'>Back to top</a>
            <p>react-formguards will add the css class 'input-invalid' to form controls that are invalid.</p>
            <p>The span that displays a FormGuard error text will have the css class 'validation-error'</p>
            <pre>
              {`
    
    .input-invalid {
      outline: 3px solid #0000ff;
    }

    span.validation-error {
      float: right;
      font-weight: bold;
      color: #00ff00;
    }

    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>

      <label htmlFor='example4-email'>Email:</label>
      <FormGuard watches='email' validatesWith={validators.required} >
          Email is required  
      </FormGuard> 
      <FormGuard watches='email' validatesWith={validators.email} >
          Please enter a valid email address  
      </FormGuard> 
      <input type='email' name='email' id='example4-email' />  
      
      <input type='submit' value='Check the console for onSubmit' />
    </ValidatedForm>
            `}
            </pre>
          </div>
          <div className='example-implementation'>
            <ExampleStyle />
          </div>
        </div>

        <hr />

        <div id='preset' className='example'>
          <div className='example-code'>
            <h2>Passing Preset Values</h2>
            <a href='https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-values.jsx'>Source</a>  -  <a href='#top'>Back to top</a>
            <p>Just pass an object as the formVals prop to preset values in the form.</p>
            <pre>
              {`
    const formVals = {
      name: 'Emmett Brown',
      email: 'doc@example.org',
      phone: '555 555 5555',
      comments: 'Great Scott!!'
    };

    [...]

    <ValidatedForm formVals={formVals} onSubmit={(e, formVals) => console.log(formVals)}>
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
            `}
            </pre>
          </div>
          <div className='example-implementation'>
            <ExampleValues />
          </div>
        </div>

        <hr />

        <div id='fieldsets' className='example'>
          <div className='example-code'>
            <h2>Grouping data with useFieldsets</h2>
            <a href='https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-fieldsets.jsx'>Source</a>  -  <a href='#top'>Back to top</a>
            <p>If you pass useFieldsets=true to a ValidatedForm it'll create sub-objects in the formVals passed to onSubmit based upon the fieldset hierarchy in the form. </p>
            <p>In the example below, the data passed to onSubmit takes the form: </p>
            <pre>{`
            
            {
              person: {
                name
                contact-info: {
                  email
                  phone
                }
              }
              comments
            }
            
            `}</pre>

            <p>If useFieldsets is false it'll have the form:</p>
            <pre>{`
            
            {
              name
              email
              phone
              comments
            }
            
            `}</pre>
            <pre>
              {`
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
            `}
            </pre>
          </div>
          <div className='example-implementation'>
            <ExampleFieldsets />
          </div>
        </div>

        <hr />

        <div id='benchmark' className='example'>
          <div className='example-code'>
            <h2>Large Forms</h2>
            <a href='https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-benchmark.jsx'>Source</a>  -  <a href='#top'>Back to top</a>
            <p>react-formguards handles large forms as well.  Here is a contrived exmaple with 200, individually validated, input boxes.</p>
            <pre>
              {`
    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>

    {[...Array(200).keys()].map(idx =>
      <div key={idx}>
        <label htmlFor={\`example2-input-\${idx}\`}>Label {idx}:</label>
        <FormGuard watches={\`input-\${idx}\`} validatesWith={validators.required} >
              Value is Required
        </FormGuard>
        <input type='text' name={\`input-\${idx}\`} id={\`example6-input-\${idx}\`} />
      </div>
    )}
    <input type='submit' value='Check the console for onSubmit' />
  </ValidatedForm>
            `}
            </pre>
          </div>
          <div className='example-implementation'>
            <details>
              <summary>Click to see example.  </summary>
              <div>
                <ExampleBenchmark />
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
