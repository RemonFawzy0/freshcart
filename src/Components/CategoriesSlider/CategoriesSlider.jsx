import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";




export default function CategoriesSlider() {


 const [categories,setCategories] = useState([])

 async function gatCategories(){
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    setCategories(data.data)
 }


useEffect(()=> {
    gatCategories()
} ,[])



    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay:true,
      };

  return (
    <>
    <div className="div mb-10">
        <h2 className="m-10 text-xl text-cyan-800 ">shop Popular Categories</h2>
        <div className="">
        <div className="">
        <Slider {...settings}>
      {categories.map((category)=> <img  className=" w-full h-40 "src={category.image} alt="" />)}
          
    </Slider>
    </div>
    </div>
    </div>
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
