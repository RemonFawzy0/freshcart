import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import CartProduct from '../CartProduct/CartProduct'
import { Link } from 'react-router-dom'


export default function Cart() {

const [cartData, setCartData] = useState(undefined)
const  [isLogeding,setIsLogeding] = useState(false)

async function getLoggedUserCart(){
  setIsLogeding(true)
  try {
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" ,{
      headers:{
        token: localStorage.getItem("token")
      }
    })
    setCartData(data)
  } catch (error) {
    
  }
  
  setIsLogeding(false)
  
 
}
 
async function removeCartItem(productId){
  setIsLogeding(true)
  let {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId ,{
    headers:{
      token: localStorage.getItem("token")
    }
  })
  setIsLogeding(false)
  setCartData(data)
}

async function clearCartItems(){
  setIsLogeding(true)
  let {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
    headers:{
      token: localStorage.getItem("token")
    }
  })
  setIsLogeding(false)
  setCartData(undefined)
}

async function updateProductCount(productId ,productCount ){
 
  if(productCount == 0){
    removeCartItem(productId)
  }else{
    
    let {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId , {count:productCount},{ 
      headers:{
        token:localStorage.getItem("token")
      }
    })
    setCartData(data)
  }
}






useEffect(()=>{
  getLoggedUserCart()
},[])




  return (
    <>
   <div>
      
   {cartData?.data.products.length > 0 &&  <button onClick={clearCartItems} className='block ms-auto mb-10 text-black border border-black px-3 rounded-md  hover:bg-red-500 hover:text-white'>Clear Cart</button> }
     {isLogeding && <Loading/>}

    {!isLogeding && <>{
      cartData?.data.products.map((product , index)=>{
        return <CartProduct key={index} product={product} removeCartItem={removeCartItem} updateProductCount={updateProductCount}/>
      })
    }
    <div className="flex justify-between">
      <Link to={'/address/'+ cartData?.data._id} className=" text-white bg-cyan-600 px-3 py-2 rounded-md ">ChecOut</Link>
      <h4>Total Cart price : {cartData?.data.totalCartPrice} EGP</h4>
    </div>
    </>}
    
    
    {!isLogeding && (cartData == undefined || cartData.data.products.length == 0) && <h2 className=' text-center font-bold font-serif text-sky-700'>No products in your cart</h2>}
    
    
    
   </div>
    </>
  )
}
