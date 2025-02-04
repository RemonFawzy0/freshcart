import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home/Home'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import NotFound from './Components/NotFound/NotFound'
import WishList from './Components/WishList/WishList'
import CounterContextProvider from './Context/CounterContext'
import AuthContextProvider from './Context/AuthContext'
import ProtectedRoute from './Components/Guards/ProtectedRoute/ProtectedRoute'
import AuthProtectedRoute from './Components/Guards/AuthProtectedRoute/AuthProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cartContextProvider from './Context/CartContext'
import Address from './Components/Address/Address'


function App() {

 const router = createBrowserRouter([
  {path:'', element:<Layout/>, children:[
    {index:true,element: <ProtectedRoute><Home/></ProtectedRoute>  },
    {path:'login',element: <AuthProtectedRoute><Login /></AuthProtectedRoute> },
    {path:'register', element: <AuthProtectedRoute><Register/></AuthProtectedRoute>},
    {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'categories', element: < ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'brands', element: < ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'wishList',element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'address/:cartId',element:<ProtectedRoute><Address/></ProtectedRoute>},
    {path:'productDetails/:id/:categoryId',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'*', element:<NotFound/>},

  ] }
])
  return (
    <>


<AuthContextProvider>
 <CounterContextProvider>
  <cartContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer/>
  </cartContextProvider>               
 </CounterContextProvider>
</AuthContextProvider>

   
        
  
  
    
    
    </>
  
  )
}

export default App
