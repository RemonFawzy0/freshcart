import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'



export default function WishList() {

  const  [isLogeding,setIsLogeding] = useState(false)

const [wishListData , setWishListData] = useState (undefined)

async function getUserWishList(){
  setIsLogeding(true)
  let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" , {
    headers:{
      token:localStorage.getItem("token")
    }
  })
  setWishListData(data)
  setIsLogeding(false)
  console.log(data)
}


async function removetWishlistItems(productId){

  let {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId , {
    headers:{
      token:localStorage.getItem("token")
    }
  })
  getUserWishList()
console.log(data.data)
}







useEffect(()=>{
  getUserWishList()
},[])


  return (
    <>

{isLogeding && <Loading/>}
                  {!isLogeding && <>  {wishListData?.data.map((product , index)=>{
            return <div key={index} className="flex p-5 shadow hover:shadow-teal-400 mb-4 justify-between ">
            <div className="flex items-center">
            <img src={product.imageCover} alt='' className=' w-32'/>
             <div className="ms-4">
               <h2 className=' font-serif'>{product.title}</h2>
               <h3 className=' text-cyan-600'>{product.category.name}</h3>
               <p className=' font-semibold'>{product.price}EGP</p>
               <p className=' font-semibold'>{product.ratingsAverage}<i className='fa-regular fa-star text-yellow-400' ></i></p>
             </div>
            </div>
            <div className=" flex justify-center items-center">
             <button  onClick={() =>removetWishlistItems(product.id) } className=' text-red-600 '>Remove<i><i className='fa-solid fa-trash'></i></i></button>
            </div>
            <div>
            <button disabled={isLogeding}  className="  mt-3 text-center bg-cyan-600  rounded text-white p-2"> {isLogeding? <i className='fas fa-spinner fa-spin mx-5 '></i>:"Add to cart"}</button>
            </div>
           </div> 
          })}

                  </>}

        {!isLogeding && wishListData?.data.length == 0 && <h2 className=' text-center font-bold font-serif text-sky-700'>My wish List</h2> }
    
    
    
    
    
    
    
    
    
    </>
  )
}

 