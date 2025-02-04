import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { cartContext } from '../../Context/CartContext'

export default function Product({product}) {

    const  [isLogeding,setIsLogeding] = useState(false)

   const {setcartCount} = useContext(cartContext)


async function getProductInCart(){
  setIsLogeding(true)
  let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart" ,{productId:product._id},{
    headers:{
      token: localStorage.getItem("token")
    }
  })
  
  setIsLogeding(false)
  
  toast.success(data.message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    setcartCount(data.numOfCartItems)
}

async function getProductInWishList(){
  
  let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{productId:product._id} ,{
    headers:{
      token:localStorage.getItem("token")
    }
  })
  toast.success(data.message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
 
}




  return (
    <>
  
   
   <div className="div">
        <div className="p-3 border my-1 mx-1 shadow  hover:shadow-cyan-600 ">
        <Link to= {"/productDetails/" + product._id + "/" + product.category._id}>
            <img src={product.imageCover} alt="Woman Shawl" className="w-full"/>
            <h5 className=" font-light text-green-400   ">{product.category.name}</h5>
            <h4 className= " font-bold ">{product.title.split(" ").slice(0,2).join("")}</h4>
            <div className="flex justify-between " >
                <h6>{product.price} EGP</h6>
                <h6><i className='fas fa-star text-yellow-300'></i> {product.ratingsAverage}</h6>
            </div>
            </Link>
            <div className="div">
              <Link >
              <i disabled={isLogeding} onClick={getProductInWishList} className="fa-solid fa-heart h3 text-center"></i>
              </Link>
        
            <button disabled={isLogeding} onClick={getProductInCart} className=" w-full mt-3 text-center bg-cyan-600  rounded text-white p-2"> {isLogeding? <i className='fas fa-spinner fa-spin mx-5 '></i>:"Add to cart"}</button>
           
            </div>
            
        </div>
    </div> 
   
   
   
   
   
   
   
   
    

    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
