import React,{useState,useEffect} from "react"
import {useDispatch} from "react-redux" 
import authService from "./appwrite/auth"
import { login,logout } from "./store/authSlice"
import { Outlet } from "react-router-dom"
import {Header,Footer} from "./components/index"
function App() {
 
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
      setLoading(true);  // Indicate loading state at the beginning
      console.log("App :: Before getCurrentUser"  );
      authService.getCurrentUser() // authService is the object we imported from the auth file 
      
        .then((userData) => {
          if (userData) { // If userData is found i.e we got access to the current User i.e the user is in the database then we can perform login
            console.log("App :: Inside then and inside if of getCurrentUser");
            
            dispatch(login({ userData })); 
          } else {
            console.log("App :: Inside then and inside else of getCurrentUser");
            dispatch(logout());
          }
        })
        .catch((error) => {
          console.error("Failed to get current user:", error);
        })
        .finally(() => setLoading(false));
    }, []);
    
    /*
      Writing setLoading(false) directly in finally might seem equivalent, but it would actually be incorrect because finally expects
      a function (callback) that it can invoke after the promise is settled.
    */
   /*
    .finally(setLoading(false)) // Incorrect usage
      In the code above, setLoading(false) would be executed immediately when the finally line is reached, not when the promise settles.
      This would lead to setLoading(false) being executed before the promise has actually completed.
   */
  return !loading ? (
    <div className="min-h-screen flex flex-wrap bg-gray-400" >
      <div className="w-full block" >
        <Header />
        {<Outlet />}
        <Footer />

      </div>
    </div>
  ) : null
}

export default App
