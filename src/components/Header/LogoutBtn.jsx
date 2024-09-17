import React from 'react'
import {useDispatch} from "react-redux"
import authService from "../../appwrite/auth"
import {logout} from "../../store/authSlice"
import { useNavigate } from 'react-router-dom';
function LogoutBtn() {
  console.log("LogOut button");
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const LogoutHandler = ()=>{
        authService.logout()
                    .then(
                        ()=>{
                            dispatch((logout()))
                            navigate("/")
                        }
                    )
                    .catch( error => console.log("LogoutBtn :: LogoutHandler :: error ",error )  )
    }
  return (
    <button onClick={LogoutHandler} className='inline-block  px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' >Logout</button>
  )
}

export default LogoutBtn