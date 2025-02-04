
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import Loading from '../Loading/Loading';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
   
      const [products , setProducts] = useState([])

    async function gatProducts() {
      let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      
      setProducts(data.data);
     }


   useEffect(() => {

    gatProducts()
   } , [])

  return( <>
  <MainSlider/>
  <CategoriesSlider/>
    
    {products.length ==0 ? <Loading/>:
  
    <div className="grid grid-cols-4">
      {products.map((product , index) => {
        return <Product product={product} key={index}/>
      })}
    </div>
  }
  
  
  
  
  </>
  
)}
