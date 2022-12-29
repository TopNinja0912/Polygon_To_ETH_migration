import { useSelector } from 'react-redux';
import React, { useEffect, useState, memo } from 'react';
import { Paper, Grid, Zoom } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { RootState } from '../../app/store';
import Card from '../../components/Card/index'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import blog1 from '../../assets/img/blog/blog1.png';
import blog2 from '../../assets/img/blog/blog2.png';
import Slider from "react-slick";
import { productItems} from '../../core/data/Product';
const Shop = () => {
  const wrapper = React.createRef();
  const appData = useSelector((state: RootState) => state.app);
  var settings = {
    dots: true,
    arrows:false,
    adaptiveHeight:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    appendDots: (dots:any) => (
      <div
        className='bottom-20'
      >
        <ul style={{ margin: "120px 10px" }}> {dots} </ul>
      </div>
    ),
    
  };
  return (
    <div className="w-full ">
      <div className={`md:h-full bg-blackgray md:fixed top-0 left-0 w-3/3 md:w-1/3`}>
        <Slider {...settings} className="h-full">
            <div className="h-screen mb-75  relative text-center">
                <img src={blog1}  className="w-full h-full" alt="avatar" />
                <div className="absolute background-none top-200 bottom-auto bottom-auto left-auto right-auto w-full">
                  <p className="text-16 font-cabin font-semibold text-white">For the best MDMA experience Ever</p>
                  <h2  className="text-32 font-cabin font-semibold text-white">MDMA IN ITS PUREST FORM</h2>
                </div>
            </div>
            <div className="h-screen mb-75 relative text-center">
                <img src={blog2} className="w-full h-full" alt="avatar"/>
                <div className="absolute background-none top-200 bottom-auto left-auto right-auto w-full">
                  <p className="text-16 font-cabin font-semibold text-white">Same day delivery in UK, NL, GB and more...</p>
                  <h2  className="text-32 font-cabin font-semibold text-white">SAFEST & FASTEST DELIVERY</h2>
                </div>
            </div>
          </Slider>
      </div>
      <div className="block md:h-screen w-3/3 md:w-2/3 pb-75 ml-auto">
        <div className="grid grid-rows-2 grid-cols-1 md:grid-rows-3 md:grid-cols-2 lg:grid-rows-2 lg:md:grid-cols-3 gap-4 h-full">
            {
              productItems.map((item: any) => {
                return (
                    <Card item={item}/>
                )
              })
            }
        </div>
      </div>
    </div>
  )
}

export default Shop;