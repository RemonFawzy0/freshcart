import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'

export default function Brands() {

const [allBrands , setAllBrands ] = useState()




 async function getAllBrands(){
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    console.log(data.data)
    setAllBrands(data.data)
 }




useEffect(()=>{
  getAllBrands()
},[])


  return (
    <>
      {!allBrands?.length == 0 || <Loading/>}

        <div className="grid grid-cols-4">
          {allBrands?.map((product, index)=>{
              return  <div key={index} class=" mx-2 my-2 bg-white border border-gray-200 rounded-lg shadow  hover:shadow-cyan-600 dark:bg-gray-800 dark:border-gray-700">
              <Link>
                  <img class="rounded-t-lg  " src={product.image} alt="" />
              </Link>
              <div class="p-5">
                  <p>
                      <h5 class="mb-2 text-2xl text-center tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                  </p>
               
              </div>
          </div>
          })}
          
          
          
          
          
          
          
          </div>    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
