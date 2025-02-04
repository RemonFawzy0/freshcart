import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'



export let cartContext = createContext(0);



export default function cartContextProvider({children}) {


const [cartCount, setcartCount] = useState()

    async function getLoggedUserCart(){
        
        try {
          let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" ,{
            headers:{
              token: localStorage.getItem("token")
            }
          })
          setcartCount(data.numOfCaerItems);
        } catch (error) {
          
        }
        
      }


useEffect(()=>{
    getLoggedUserCart()
},[])




  return <cartContext.Provider value={{ cartCount, setcartCount }}>
          {children} 
  </cartContext.Provider>
}
