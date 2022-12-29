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

const Faqs = () => {
 
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
      <div className="block scrollbar-hide w-12/12 md:w-7/12 px-70 pt-68 pb-100 ml-auto">
        <div className='product-description pb-50'>
          <h2 className="text-62 font-cabin font-semibold text-white">FAQS</h2>
          <br></br>
          <p className="text-15 font-cabin py-10 text-white"><strong>Is my purchase completely secure through your shop when I make a Purchase?</strong></p>
          <p className="text-15 font-cabin py-10 text-white">Yes. Just add the desired quantity to the cart and enter your address at the checkout. Your personal data is automatically encrypted using PGP and deleted after the order is dispatched. Our team of professionals then packs the goods in clean-room conditions, and ensures smooth and secure processing.</p>
          <p className="text-15 font-cabin py-10 text-white"><strong>Can I really only pay with cryptocurrency?</strong></p>
          <p className="text-15 font-cabin  py-10 text-white">Yes. We only accept payments in Bitcoin, Litecoin, Doge, and Ethereum. The payment procedure is not complicated. You just need to set up a suitable wallet.</p>
          <p className="text-15 font-cabin py-10 text-white"><strong>How can I receive my order anonymously?</strong></p>
          <p className="text-15 font-cabin  py-10 text-white">Our shipping department operates around the clock to ensure fast and risk-free shipping. The delivery usually arrives within a few days. Your order can be sent to any valid postal address, PO box, or package station. Thanks to our highly complex and decentralized system, the transfer to the logistics service provider is already anonymous and cannot be traced back.</p>
          <p className="text-15 font-cabin py-10 text-white"><strong>How to request a refund?</strong></p>          
          <p className="text-15 font-cabin  py-10 text-white">Nobody has claimed that doing drugs was safe. However our products are clean, pure and uncut, and as long as you follow the guide in the Safety section there should not be any issues.</p>
        </div>

        
      </div>
      
    </div>
  )
}

export default Faqs;