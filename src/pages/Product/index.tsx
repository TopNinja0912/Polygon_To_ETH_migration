import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { Paper, Grid, Zoom } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Formik,Field } from "formik";
import yup, { string, number } from "yup";
import * as Yup from "yup";
import {useHistory } from 'react-router-dom';
import { RootState } from '../../app/store';
import Card from '../../components/Card/index'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import blog1 from '../../assets/img/blog/blog1.png';
import blog2 from '../../assets/img/blog/blog2.png';
import Slider from "react-slick";
import { productItems} from '../../core/data/Product';
import {
  setCurrentIndex
} from '../../app/appSlice';
const Product = () => {
  let para:any = useParams();
  const wrapper = React.createRef();
  const appData = useSelector((state: RootState) => state.app);
  const history = useHistory();
  const dispatch = useDispatch();
  const [mainitem, setmainitem] = useState({
    name: '',
    category:'',
    description: '',
    image: '',
    url: '',
    min_price: 0,
    effect_title:"",
    effect_description:[
    ],
    s_description:'',
    ship_option:[],
    effect_image:'',
    symbol:'',
  });
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  var settings = {
    dots: false,
    adaptiveHeight:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1    
  };
  const navigation = (item: any) => {
    dispatch(setCurrentIndex(item.name));
    return history.push(`${item.url}`)
  }
  useEffect(() => {
    console.log("mainitem:");
    console.log(para);
    productItems.map((item: any) => {
      console.log(item.name);
      console.log(para.id);
      if(item.symbol == para.id)
      setmainitem(item);
    })
  }, []);
  
  return (
    <div className="w-full ">
      <div className={`h-full bg-blackgray md:fixed top-0 left-0 w-12/12 md:w-5/12`}>
        <img src={window.location.origin + mainitem?.image} className="w-full h-full" alt="avatar" />      
      </div>
      <div className="block  scrollbar-hide w-12/12 md:w-7/12 px-70 pt-68 pb-100 ml-auto">
        <div className='product-description pb-50'>
          <p className="text-16 font-cabin font-semibold text-white">{mainitem.category}</p>
          <h2 className="text-32 font-cabin font-semibold text-white">{mainitem.name}</h2>
          {console.log(mainitem)}
          <br></br>
          <p className="text-14 font-cabin font-semibold text-white">{mainitem.s_description}</p>
        </div>
        <div className='product-effect-description pb-50'>
          <p className="text-24 font-cabin font-semibold text-center text-white">{mainitem.effect_title}</p>
          {
            mainitem.effect_description.map((item: any) => {
              return (
                <div className="flex">
                  <svg className="w-20 h-25 text-purple" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                  <span className="text-17 ml-5 tracking-wider font-cabin font-carbon text-white">{item}</span>
                </div>
              )
            })
          }
        </div>
        <div className='product-ship pb-50'>
          <p className="text-24 font-cabin font-semibold text-center text-white">FREE & SAFE DELIVERY</p>
          <div className="flex flex-grow justify-between">
            <div className="flex">
            <svg className="w-20 h-20 text-purple" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              <span className="text-14 ml-5 font-cabin font-semibold text-white">NL, DE, UK, BE ~ 1-7 Days</span>
            </div>
            <div className="flex">
              <svg className="w-20 h-20 text-purple" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              <span className="text-14 ml-5 font-cabin font-semibold text-white">The Rest Of The World ~ 7-30 Days</span>
            </div>
          </div>
          {                
            <Formik
              enableReinitialize={true} 
              initialValues={{
                price: 0,
                flag : 0,
              }}
              onSubmit={async (values) => {
                const cartData = localStorage.getItem('cartData');
                // cartData = '[{}]';
                let flag = 0;
                if (cartData) {
                  const parsedData = JSON.parse(cartData);
                  // console.log(parsedData.length);
                  const updateData = parsedData.map((item:any)=> {
                    
                      if(mainitem.symbol == item.product.symbol && values.price == item.price)
                      {
                        flag = 1;
                        return {
                          product:mainitem, price:values.price, count : item.count + 1
                        }
                      }
                      return {
                        product:item.product, price:item.price, count : item.count
                      };
                    
                    });
                    const buyItem = {product:mainitem, price:values.price, count : 1}
                    localStorage.setItem('buyItem', JSON.stringify(buyItem));
                    console.log(values);
                    // if(flag == 1) {
                    
                      console.log(flag);
                    //   alert("D");
                      if(flag == 0) {
                        if(values.flag == 1) {
                          updateData.push({product:mainitem, price:values.price, count : 1});
                          localStorage.setItem('cartData', JSON.stringify(updateData));
                        }
                      }
                    // }
                  }
                  else{    
                    if(values.flag == 1) {                
                      const updateData = [];
                      updateData.push({product:mainitem, price:values.price, count : 1});
                      localStorage.setItem('cartData', JSON.stringify(updateData));  
                    }                  
                  }
                  if(values.flag == 1)
                    return history.push('/cart');
                  else
                    return history.push('/checkout/1');
                // fetchCompanies();
              }}
              validationSchema={Yup.object().shape({
                // name: Yup.string()
                //   .required("Required")
              })}
              render={({ errors,touched, values, handleSubmit,setFieldTouched, setFieldValue }) => (      
                <form onSubmit={handleSubmit} className="">
                  <Grid container spacing={5} className="flex items-center">
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <label className="text-14 font-regular text-darkblue font-cabin"  htmlFor="name" style={{ display: "block" }}>
                        Option
                      </label>
                      <Field 
                        className="px-10 py-10 h-50 w-full outline-none rounded-lg border border-solid border-darkblue focus:text-gray-700 focus:bg-white focus:border-orange focus:outline-none"
                        as="select" 
                        name="price" 
                        id="price"
                      >
                        <option value="0">Choose Option</option>
                        {
                          mainitem.ship_option.map((shipitem:any) => {
                            return (
                              <option value={shipitem.price}>{shipitem.key}</option>
                            );
                          })}
                      </Field>
                      {values.price > 0  && (
                        <div className="text-14 font-cabin text-center pt-30 pb-10 font-semibold text-white">{formatter.format(values.price)}</div>
                      )}
                      <div className='flex justify-center pt-10'>
                        <button  type="submit" onClick={()=>{values.flag = 1}} className="text-16 font-semibold mx-5 px-20 font-cabin relative h-50 z-0 text-center rounded-sm text-white  cursor-pointer bg-blueviolet flex" >
                        <span className="mx-auto my-auto">Add Cart</span>
                        </button>
                        <button  type="submit" onClick={()=>{values.flag = 2}} className="text-16 font-semibold mx-5 px-20 font-cabin relative h-50 z-0 text-center rounded-sm text-white  cursor-pointer bg-blueviolet flex" >
                        <span className="mx-auto my-auto">Buy now</span>
                        </button>
                      </div>
                      
                    </Grid>
                  </Grid>
                </form>                    
              )
            }/>            
          }
          <h4>QUALITY AND DELIVERY GUARANTEED OR FULL REFUND</h4>
          
        </div>
        {mainitem?.effect_image != "" && (
          <div className='support_description px-20'>
            <p className="text-22 font-cabin font-semibold text-white text-center">You get the purest drugs available on the planet</p>
            <img src={window.location.origin + mainitem?.effect_image} className="w-full h-auto" alt="avatar" />
          </div>
        )}
        
        <div className='feedback px-20'>
          <h4 className="text-22 font-cabin font-semibold text-white text-center">REVIEWS</h4>
          <Slider {...settings} className="w-full mb-40">
            <div className="w-full bg-white px-20 py-10">
              <p className="text-15 font-cabin font-semibold text-black">Same day delivery in UK, NL, GB and more...</p>
              <div className="flex items-center">
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
            </div>
            <div className="w-full bg-white px-20 py-10">
              <p className="text-15 font-cabin font-semibold text-black">Same day delivery in UK, NL, GB and more...</p>
              <div className="flex items-center">
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>
            <div className="w-full bg-white px-20 py-10">
              <p className="text-15 font-cabin font-semibold text-black">Same day delivery in UK, NL, GB and more...</p>
              <div className="flex items-center">
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-25 h-25 text-darkyellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>
          </Slider>
          <p className="text-16 font-cabin font-semibold text-white text-center">Live support and review section are available for customers only.</p>
        </div>
      </div>
      
    </div>
  )
}

export default Product;