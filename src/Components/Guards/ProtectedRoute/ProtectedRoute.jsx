import React, { useContext } from 'react'
import { Authcontext } from '../../../Context/AuthContext'
import Login from '../../Login/Login'




export default function ProtectedRoute({children}) {



     const{isUserLogedin} = useContext(Authcontext)
  return (
    <>
    
    {isUserLogedin ? children : <Login/>}
    
    </>
  )
}
