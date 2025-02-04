import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'

export default function Categories() {


const [getCategories,setGetCategories ] = useState()


async function getAllCategories(){
   let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
   setGetCategories(data.data)
   
}


useEffect(()=>{
  getAllCategories()
},)


  return (
    <>
    {!getCategories?.length == 0 || <Loading/>}
    
    <div className="grid grid-cols-3">
    {getCategories?.map((product, index) => {
      return  <div key={index} class=" mx-2 my-2 bg-white border border-gray-200 rounded-lg shadow  hover:shadow-cyan-600 dark:bg-gray-800 dark:border-gray-700">
          <Link>
              <img class="rounded-t-lg  w-full  h-[400px]" src={product.image} alt="" />
          </Link>
          <div class="p-5">
              <p>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-center  text-cyan-800 dark:text-white">{product.name}</h5>
              </p>
           
          </div>
      </div>
      
    })}
  </div>

    </>
  )
}
