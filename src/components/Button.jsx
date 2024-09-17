import React from 'react'

function Button({
    children,
    type = "submit",
   bgColor = "bg-blue-600",
   textColor = "text-white",
   className = "" ,
   ...props
}) {
  return (
    // Here children is simply the name passed
    <button className={ `px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} type={type} {...props}   >  {children} </button> 
  )
}
/*
<Button 
  onClick={() => alert('Button clicked!')} 
  id="submit-button"
>
  Submit
</Button>

Rendered HTML

  <button
  id="submit-button"
  class="px-4 py-2 rounded-lg bg-blue-600 text-white"   
  onclick="function() { alert('Button clicked!') }"        onClick is the spreaded prop that the user has passed on . This is the reason we have spread the props 
>
  Submit
</button>

*/
export default Button