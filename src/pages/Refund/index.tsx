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

const Refund = () => {
 
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
      <div className="block   scrollbar-hide w-12/12 md:w-7/12 px-70 pt-68 pb-100 ml-auto">
        <div className='product-description'>
          <h2 className="text-62 font-cabin font-semibold text-white">REFUND</h2>
          <br></br>
        </div>
        <div className='product-description pb-50'>
          <p className="text-15 py-10 font-cabin text-white"><strong>Delivery and Quality Guaranteed or 100% Refund / Reship</strong></p>
          <p className="text-15 py-10 font-cabin text-white">You will be able to request a refund/reship 24 days after the order was placed.</p>
          <p className="text-15 py-10 font-cabin  text-white">Reships will require a new shipping address.</p>
          <p className="text-15 py-10 font-cabin  text-white">Each order is entitled to 1 reship.</p>
          <p className="text-15 py-10 font-cabin  text-white">This applies to European orders only, due to the technicality of international orders and security, we do not do not reship or refund on orders outside of Europe or orders that are not tracked, how ever <strong>the products always land 99 percent of the time.</strong></p>
          <p className="text-15 py-10 font-cabin  text-white"><strong>How to request a refund?</strong></p>
          <p className="text-15 py-10 font-cabin  text-white">Go to My Account  Orders<br/>Press the button “VIEW AND MESSAGE” of the order<br/>Use the chat window and let us know that you want to request a refund/reship.</p>
          <p className="text-15 py-10 font-cabin  text-white">We usually reply within few minutes.</p>
          <p className="text-15 py-10 font-cabin  text-white"><strong>Keep in mind that we have no control over the delays caused by the shipping system. Our delivery success rate is over 99% so please be patient.</strong></p>
        </div>

        
      </div>
      
    </div>
  )
}

export default Refund;