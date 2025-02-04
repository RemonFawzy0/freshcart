import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import Loading from '../Loading/Loading';


export default function Products() {
   
      const [products , setProducts] = useState([])

    async function gatProducts() {
      let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      
      setProducts(data.data);
     }


   useEffect(() => {

    gatProducts()
   } , [])

  return( <>
 
    
    {products.length ==0 ? <Loading/>:
  
    <div className="grid grid-cols-4">
      {products.map((product , index) => {
        return <Product product={product} key={index}/>
      })}
    </div>
  }
  
  
  
  
  </>
  
)}
