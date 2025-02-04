import React, { useState } from 'react'

export default function CartProduct({product,removeCartItem , updateProductCount} ) {



    const [count, setCount] = useState(product.count)
  return (
    <>



<div  className="flex p-5 shadow hover:shadow-teal-400 mb-4 justify-between ">
       <div className="flex items-center">
       <img src={product.product.imageCover} alt='' className=' w-32'/>
        <div className="ms-4">
          <h2 className=' font-serif'>{product.product.title}</h2>
          <h3 className=' text-cyan-600'>{product.product.category.name}</h3>
          <p className=' font-semibold'>{product.price}EGP</p>
          <p className=' font-semibold'>{product.product.ratingsAverage}<i className='fa-regular fa-star text-yellow-400' ></i></p>
        </div>
       </div>
       <div className=" flex justify-between">
        <button  onClick={() =>removeCartItem(product.product._id) } className=' text-red-600 '>Remove<i><i className='fa-solid fa-trash'></i></i></button>
        <div>
          <button onClick={()=>{updateProductCount(product.product._id ,product.count -1 ); setCount(product.count -1)}} className='mx-2 border px-2 rounded-md hover:bg-sky-600'>-</button>
          <span >{count}</span>
          <button onClick={()=>{updateProductCount(product.product._id ,product.count +1 ); setCount(product.count +1) }} className='mx-2 border px-2 rounded-md hover:bg-sky-600'>+</button>
        </div>
       </div>
      </div>
    </>
  )
}
