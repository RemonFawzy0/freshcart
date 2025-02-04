import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Slider from "react-slick";
import { toast } from 'react-toastify'
import { cartContext } from '../../Context/CartContext';
export default function ProductDetails() {
   

const [productDetails , setProductDetails] = useState({})
const [isLoading , setLoading] = useState(true)
const [relateProductDetails , setRelateProductDetails] = useState([])
const  [isLogedingTwo,setIsLogedingTwo] = useState(false)
 const { id, categoryId } = useParams()
 const {setcartCount} = useContext(cartContext)

 async function getProductDetails(productId) {
    setLoading(true);
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + productId)
    setProductDetails(data.data);
    setLoading(false);
        }

    

        async function getProductDetailsByCategory(categoryId) {
          
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products?category[in]=" + categoryId)
            setRelateProductDetails(data.data);
          
                }


             


                async function getProductInCart(){
                  setIsLogedingTwo(true)
                  let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart" ,{productId:id},{
                    headers:{
                      token: localStorage.getItem("token")
                    }
                  })
                 
                  setIsLogedingTwo(false)
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
  
                  let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{productId:id} ,{
                    headers:{
                      token:localStorage.getItem("token")
                    }
                  })
                  console.log(data)
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
                






useEffect(()=>{
    getProductDetails(id)
    getProductDetailsByCategory(categoryId)
},[id , categoryId])

if(isLoading){
  return <Loading/>
}



var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
  };

  return (
    <>
      <div className=" flex ">
        <div className="w-1/4">
        <Slider {...settings}>
      {productDetails.images.map((src)=> <img  className=" w-full "src={src} alt= {productDetails.title}/>)}
     
    </Slider>
       
        </div>
        <div className=" w-3/4 p-6 ">
        <h2 className=" text-lg font-medium text-gray-800 mt-16  ">{productDetails.title}</h2>
        <p className=" text-gray-500 m-4 font-light   ">{productDetails.description}</p>
        <div className="flex justify-between " >
                <h6>{productDetails.price}EGP</h6>
                <h6><i className='fas fa-star text-yellow-300'></i> {productDetails.ratingsAverage}</h6>
            </div>
            <button onClick={getProductInWishList}>
              <i className="fa-solid fa-heart h3 text-center"></i>
              </button>
            <button disabled={isLogedingTwo} onClick={getProductInCart} className=" w-full text-center bg-cyan-600  rounded text-white p-2  mt-32">{isLogedingTwo? <i className='fas fa-spinner fa-spin mx-5 '></i>:"Add to cart"}</button>
        </div>
    </div>
    <div className="">
    <Slider {...settings}>
    {relateProductDetails.map((product)=>
   <div className="">
     <div key={product.id} className="">
        <div className=" flex justify-center items-center ">
        <Link to= {"/productDetails/" + product._id + "/" + product.category._id}>
   
   <div className="">
        <div className="p-3  ">
            <img src={product.imageCover} alt="Woman Shawl" className="w-full"/>
            <h5 className=" font-light text-green-400   ">{product.category.name}</h5>
            <h4 className= " font-bold ">{product.title.split(" ").slice(0,2).join("")}</h4>
            <div className="flex justify-between " >
                <h6>{product.price}</h6>
                <h6><i className='fas fa-star text-yellow-300'></i> {product.ratingsAverage}</h6>
            </div>
            <button className=" w-full mt-3 text-center bg-cyan-600  rounded text-white p-2"> Add to cart</button>
        </div>
    </div>  
   </Link>
        </div>
    </div>
   </div>
)}
    </Slider>
    </div>
   

    </>
  )
}
