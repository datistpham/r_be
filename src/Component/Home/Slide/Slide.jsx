import React from 'react'
import Slider from 'react-slick';


export const settings = {
    infinite: true,
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
};
const Slide = () => {
  return (
    <div style={{width: "100%", overflowX: "hidden"}}>
        <Slider {...settings}>
            <img src="https://res.cloudinary.com/cockbook/image/upload/v1677413811/single/Screenshot_2023-02-26_191612_s3obz9.png" alt="" />
            <img src="https://res.cloudinary.com/cockbook/image/upload/v1676559427/Screenshot_2023-02-16_215644_ovioud.png" alt="" />
            <img src="https://res.cloudinary.com/cockbook/image/upload/v1676559426/Screenshot_2023-02-16_215632_yrk6n7.png" alt="" />
        
        </Slider>
    </div>
  )
}

export default Slide