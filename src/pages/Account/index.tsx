import { useSelector } from 'react-redux';
import React, { useEffect, useState, memo } from 'react';
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
import { RootState } from '../../app/store';
import Card from '../../components/Card/index'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bg from '../../assets/img/bg.png';

const Account = () => {
 
  const wrapper = React.createRef();
  const appData = useSelector((state: RootState) => state.app);
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  
 
  
  return (
    <div className="w-full ">
      <div className={`h-full bg-blackgray md:fixed top-0 left-0 w-12/12 md:w-5/12`}>
        <img src={bg} className="w-full h-full" alt="avatar" />      
      </div>
      <div className="block h-screen  scrollbar-hide w-12/12 md:w-7/12 px-70 pt-68 pb-100 ml-auto">
        <div className='product-description pb-50'>
          <h2 className="text-62 font-cabin font-semibold text-white">MY ACCOUNT</h2>
          <br></br>
          <p className="text-15 font-cabin font-semibold text-white">View your recent orders and edit your account details.</p>
        </div>
        <div className='flex flex-grow justify-around'>
          <div className='product-ship pb-50 w-1/3'>
            <div>            <p className="text-24 font-cabin font-carbon text-center text-white">Login</p></div>

            {                
              <Formik
                enableReinitialize={true} 
                initialValues={{
                  name: "",
                  password:"",
                }}
                onSubmit={async (values) => {
                  
                  
                  // fetchCompanies();
                }}
                validationSchema={Yup.object().shape({
                  // name: Yup.string()
                  //   .required("Required")
                })}
                render={({ errors,touched, values, handleSubmit,setFieldTouched, setFieldValue }) => (      
                  <form onSubmit={handleSubmit} className="my-30">
                    <Grid container spacing={5} className="flex items-center border-2 border-white">
                      <Grid item lg={12} md={12} sm={12} xs={12} className="pb-15">
                        <label className="text-15 font-regular text-darkblue font-cabin"  htmlFor="name" style={{ display: "block" }}>
                          Username or email address <span>*</span>
                        </label>
                        <Field as="input" 
                          className="px-10 py-10 h-30 w-full outline-none  border border-solid border-darkblue focus:text-gray-700 focus:bg-white  focus:outline-none" 
                          id="name" 
                          name="name" 
                          placeholder="" 
                        />
                        {errors.name && touched.name && (
                          <div className="input-feedback">{errors.name}</div>
                        )}
                        
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="pb-10">
                        <label className="text-15 font-regular text-darkblue font-cabin"  htmlFor="name" style={{ display: "block" }}>
                          Password <span>*</span>
                        </label>
                        <Field as="input" 
                          className="px-10 py-10 h-30 w-full outline-none  border border-solid border-darkblue focus:text-gray-700 focus:bg-white  focus:outline-none" 
                          id="password" 
                          name="password" 
                          placeholder="" 
                        />
                        {errors.password && touched.password && (
                          <div className="input-feedback">{errors.password}</div>
                        )}                        
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="pb-15">
                        <button  type="submit" className="text-16 font-semibold mx-5 px-10 font-cabin relative h-30 z-0 text-center rounded-sm text-blackgray  cursor-pointer bg-white flex" >
                          <span className="mx-auto my-auto">Log In</span>
                        </button>    

                        <Link to="/forgot">
                          <label className="text-15 font-regular text-darkblue font-cabin cursor-pointer pt-15" style={{ display: "block" }}>
                          Lost your password?
                          </label>
                        </Link>                   
                      </Grid>
                    </Grid>
                  </form>                    
                )
              }/>            
            }
            
          </div>
          <div className='product-ship pb-50  w-1/3'>
            <div>            <p className="text-24 font-cabin font-carbon text-center text-white">Sign Up</p></div>

            {                
              <Formik
                enableReinitialize={true} 
                initialValues={{
                  name: "",
                  password:"",
                }}
                onSubmit={async (values) => {
                  
                  
                  // fetchCompanies();
                }}
                validationSchema={Yup.object().shape({
                  // name: Yup.string()
                  //   .required("Required")
                })}
                render={({ errors,touched, values, handleSubmit,setFieldTouched, setFieldValue }) => (      
                  <form onSubmit={handleSubmit} className="my-30">
                    <Grid container spacing={5} className="flex items-center border-2 border-white">
                      <Grid item lg={12} md={12} sm={12} xs={12} className="pb-15">
                        <label className="text-15 font-regular text-darkblue font-cabin"  htmlFor="name" style={{ display: "block" }}>
                          Username or email address <span>*</span>
                        </label>
                        <Field as="input" 
                          className="px-10 py-10 h-30 w-full outline-none  border border-solid border-darkblue focus:text-gray-700 focus:bg-white  focus:outline-none" 
                          id="name" 
                          name="name" 
                          placeholder="" 
                        />
                        {errors.name && touched.name && (
                          <div className="input-feedback">{errors.name}</div>
                        )}
                        
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="pb-10">
                        <label className="text-15 font-regular text-darkblue font-cabin"  htmlFor="name" style={{ display: "block" }}>
                          Password <span>*</span>
                        </label>
                        <Field as="input" 
                          className="px-10 py-10 h-30 w-full outline-none  border border-solid border-darkblue focus:text-gray-700 focus:bg-white  focus:outline-none" 
                          id="password" 
                          name="password" 
                          placeholder="" 
                        />
                        {errors.password && touched.password && (
                          <div className="input-feedback">{errors.password}</div>
                        )}                        
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="pb-15">
                        <button  type="submit" className="text-16 font-semibold mx-5 px-10 font-cabin relative h-30 z-0 text-center rounded-sm text-blackgray  cursor-pointer bg-white flex" >
                          <span className="mx-auto my-auto">Register</span>
                        </button>                    
                      </Grid>
                    </Grid>
                  </form>                    
                )
              }/>            
            }
            
          </div>
        </div>

        
      </div>
      
    </div>
  )
}

export default Account;