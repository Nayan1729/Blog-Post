import {configureStore} from "@reduxjs/toolkit"
/*
    You can either make the slices in the src -> features -> features.js or you can also do the same in the directory where store is 
*/
// import  authReducer  from "./authSlice"
import authSlice from "./authSlice"
const store = configureStore({
    reducer : {
        auth : authSlice
    }
})
export default store
