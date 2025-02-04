import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
   <Navbar/>
  
  <div className="mx-auto w-3/4 my-5 p-4 ">
       <Outlet/>
  </div>
  
   <Footer/>
  </>
}
