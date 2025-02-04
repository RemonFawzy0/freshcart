import { createContext, useEffect, useState } from "react";
import{jwtDecode} from "jwt-decode";


 export const Authcontext = createContext(false);


export default function AuthContextProvider({children}){
    const [isUserLogedin,setIsUserLogedin] = useState (false)
    const [userData,setUserData] = useState ()

useEffect( () =>{
      
    try{
     
      setUserData(jwtDecode(localStorage.getItem("token")))
        setIsUserLogedin(true);
         }catch(error){
             setIsUserLogedin(false)
             localStorage.removeItem("token")
    
         }

         
         window.addEventListener("storage" , () =>{
            try{
           jwtDecode(localStorage.getItem("token"));
           setIsUserLogedin(true);
            }catch(error){
                setIsUserLogedin(false)
                localStorage.removeItem("token")
        
        
            }
           
        } , [])


} , [])



    

    return <Authcontext.Provider value= {{isUserLogedin, setIsUserLogedin , userData }}>
             {children}
    </Authcontext.Provider>
}