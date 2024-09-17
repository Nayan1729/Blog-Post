import React,{useId} from 'react'
/*
        Why react.forwardRef ?
        #########Normal Behavior of ref in React:
    --Normally, React's ref can only be used on built-in DOM elements (like <input>, <div>, etc.) to directly accessthem.
    --When you create a custom component (like your Input component), a ref passed to that custom component will point to the component instance itself rather than the internal DOM elements (like the <input>).


    Without React.forwardRef, if you try to pass a ref to your custom Input component from the Login component, React won't let you access the underlying DOM element (<input>). Instead, the ref would point to the Input component instance.

    
    --Use the Input Component inside SignUp and Login components: If the Login component (or any other component)
    wants to manipulate the input, it can now use ref to directly access the underlying <input> element.
     
    import React, { useRef } from 'react';
    import Input from './Input';

    function Login() {
    const inputRef = useRef(null); // Create a ref

    const focusInput = () => {
        // Directly interact with the input element using ref
        if (inputRef.current) {
        inputRef.current.focus();
        }
    };

    return (
        <div>
        <Input ref={inputRef} label="Username" />
        <button onClick={focusInput}>Focus on Username Input</button>
        </div>
    );
    }

    export default Login;



React.forwardRef allows you to "forward" the ref from the parent component (e.g., Login) down to a DOM element
inside the child component (e.g., the <input> element inside your Input component).

*/
const Input = React.forwardRef(({label,type="text",className="",...props},ref  )=>{
    const id = useId()
    return (
        <div className='w-full'>
            {/*  Label  */}

            {label && <label htmlFor={id} className='inline-block mb-1 pl-1' > 
                {label}
            </label> 
            }

            {/* Input  */}

            {
                <input type={type} name={label} id={id} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                        ref={ref} {...props}
                />
            }
            
        </div>
    )
})

export default Input