import React from 'react'
import img1 from '../../assets/images/w200.jpg'
import img2 from '../../assets/images/w300.jpg'
import img3 from '../../assets/images/w400.jpg'
import img4 from '../../assets/images/w500.jpg'
import img5 from '../../assets/images/w600.jpg'
import Slider from "react-slick";
export default function MainSlider() {


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
    <div className="row flex justify-center items-center">
        <div className="w-3/4">
        <Slider {...settings}>
        <img src={img3} alt="" className=" w-full h-[500px]"/>
        <img src={img4} alt="" className=" w-full h-[500px] "/>
        <img src={img5} alt="" className=" w-full h-[500px]"/>
     
       </Slider>
      
        </div>
        <div className="w-1/4">
        <img src={img1} alt="" className=" w-full h-[250px]"/>
        <img src={img2} alt=""className=" w-full h-[250px]" />
        </div>
    </div>
    
    
    
    
    </>
  )
}
