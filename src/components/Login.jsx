import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'
import {Button,Input,Logo} from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm } from "react-hook-form"

// Here we will learn how to handle form

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register,handleSubmit} = useForm()
    const [error, setError] = useState("")
    console.log("Login :: Hello");
    
    const login = async(data) =>{
        console.log(data);
        
        setError("") // While logging in setError to nothing as we will detect error in this login function
        try {
            const session = await authService.login(data)
            //This will return a session 
            if(session)
            {
                const userData = await authService.getCurrentUser()
                console.log(userData);
                console.log("inside login");
                
                
                if(userData) dispatch(storeLogin({userData}));
                navigate("/")// Once all of this is done we would pprogramatically navigate the user to the home directory 
                // If we use link then it would need to be cliceked but by using navigate we can programatically redirect user to the root directory
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className = "text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className = "mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

/*
             Here what we are doing is that we are simply creating a login method and handleSubmit takes that login as a argument 

             How handleSubmit Works:

            1)Validation Check:

            When the user submits the form, handleSubmit first runs validation checks on all the form fields that have been registered using the register function.
            If any of the fields do not meet their validation criteria (e.g., required fields left empty), handleSubmit will prevent the form from submitting and will instead update the form’s error state.

            2)Form Submission:

            If all the registered fields pass their validation checks, handleSubmit then proceeds to call the function you passed to it (in your case, the login function) with the form data as an argument.
            The form data passed to your submission function is a plain JavaScript object, where the keys are the names of the form fields and the values are the inputs provided by the user.
            
            3)Error Handling:

            If the form fails validation, handleSubmit does not call your submission function. Instead, it populates the form’s error object with the relevant validation errors, allowing you to display error messages or take other actions.
            If the form submission function itself throws an error (e.g., due to an API failure), you can catch it and handle it within your submission function.

        */
/* 
                 
                    --In React Hook Form (RHF), the register function returns an object that contains various
                        properties and methods (e.g., onChange, onBlur, ref, etc.) that are needed to handle form
                        field interactions, such as value tracking, validation, and registering the input element
                        in the form's state.

                    --When you spread (...register("fieldName")) inside an input element, you're effectively
                    passing these properties directly into the input as individual props. This is possible 
                    because the register function returns an object, and spreading the object applies each of 
                    its key-value pairs as props on the input.
                    
                    -- If you don't spread the register function in React Hook Form (RHF), 
                    the input won't be connected to the form's state or validation system, 
                    which means several things will be missing.
                    
            
            */
export default Login
