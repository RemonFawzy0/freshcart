import React, { useContext } from 'react'
import { Authcontext } from '../../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function AuthProtectedRoute({children}) {


    const{isUserLogedin} = useContext(Authcontext)

  return (
    <>
            {isUserLogedin ? <Navigate to={'/'}/> :  children}

    </>
  )
}
