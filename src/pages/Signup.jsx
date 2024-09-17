// Here what we do is simply add the components that we have made
import React from 'react'
import {Signup as SignupComponent }  from '../components/index.js'
function Signup() {
  return (
    <div className='py-8'>
        <SignupComponent /> 
    </div>
  )
}

export default Signup