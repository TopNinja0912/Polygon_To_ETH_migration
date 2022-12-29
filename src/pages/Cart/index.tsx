import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, memo } from 'react';
import {useHistory } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { Paper, Grid, Zoom } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Formik,Field,FieldArray  } from "formik";
import yup, { string, number } from "yup";
import * as Yup from "yup";
import { RootState } from '../../app/store';
import Card from '../../components/Card/index'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bg from '../../assets/img/bg.png';
import {
  setCurrentIndex
} from '../../app/appSlice';
const Cart = () => {
 
  const wrapper = React.createRef();
  const appData = useSelector((state: RootState) => state.app);
  const history = useHistory();
  const dispatch = useDispatch();
  const [cartdata, setcartdata] = useState([]);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
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
    const cartData = localStorage.getItem('cartData');
    if(cartData)
    {
      const parsedData = JSON.parse(cartData);
      setcartdata(parsedData);
    }
  }, []);
  
 
  
  return (
    <div className="w-full ">
      <div className={`h-full bg-blackgray md:fixed top-0 left-0 w-12/12 md:w-5/12`}>
        <img src={bg} className="w-full h-full" alt="avatar" />      
      </div>
      <div className="block scrollbar-hide w-12/12 md:w-7/12 px-70 pt-68 pb-100 ml-auto">
        <div className='product-description pb-50'>
          <h2 className="text-62 font-cabin font-semibold text-white">CART</h2>
          <br></br>
        </div>
        <div className='flex flex-grow justify-around'>
          <div className='product-ship pb-50 '>

            {                
              <Formik
                enableReinitialize={true} 
                initialValues={{
                  name: "",
                  password:"",
                  cartdata:cartdata,
                }}
                onSubmit={async (values) => {
                  
                  history.push('/checkOut/2');
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
                      <FieldArray
                        name="cartdata"
                        render={arrayHelpers => (

                          <div className="overflow-x-auto relative">
                              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                  <thead className="text-xs text-white uppercase bg-blackgray">
                                      <tr>
                                          <th scope="col" className="py-3 px-6 border border-white">
                                              
                                          </th>
                                          <th scope="col" className="py-3 px-6 border border-white">
                                              
                                          </th>
                                          <th scope="col" className="py-3 px-6 border border-white">
                                              Product name
                                          </th>
                                          <th scope="col" className="py-3 px-6 border border-white">
                                              Price
                                          </th>
                                          <th scope="col" className="py-3 px-6 border border-white">
                                              Quantity
                                          </th>
                                          <th scope="col" className="py-3 px-6 border border-white">
                                              Sub total
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                    {values.cartdata && values.cartdata.length > 0 ? (
                                      values.cartdata.map((productitem :any, index) => (
                                        <tr key={index} className="bg-blackgray text-white">
                                          <td className="py-4 px-6 border border-white">
                                            <span
                                              onClick={() => arrayHelpers.remove(index)}>
                                              X
                                            </span>
                                          </td>
                                          <td className="py-4 px-6 border border-white">
                                              <img src={window.location.origin + productitem.product?.image} className="w-20 h-20" alt="avatar" />
                                          </td>
                                          <td className="py-4 px-6 border border-white">
                                             {productitem.product.name}
                                          </td>
                                          <td className="py-4 px-6 border border-white">
                                             {productitem.price}
                                          </td>
                                          <td className="py-4 px-6 border border-white">
                                             {productitem.count}
                                          </td>
                                          <td className="py-4 px-6 border border-white">
                                             {productitem?.count * productitem?.price}
                                          </td>                                                                                    
                                        </tr>
                                      ))
                                    ) : (
                                      <tr></tr>
                                    )}
                                  </tbody>
                              </table>
                          </div>
                        )}
                      />
                        
                      </Grid>
                      
                      <Grid item lg={12} md={12} sm={12} xs={12} className="pb-15">
                        <button type="submit" className="text-16 font-semibold mx-5 px-10 font-cabin relative h-30 z-0 text-center rounded-sm text-blackgray  cursor-pointer bg-blueviolet flex" >
                          <span className="mx-auto my-auto">Process Check Out</span>
                        </button>                      
                      </Grid>
                    </Grid>
                  </form>                    
                )
              }
              />            
            }
            
          </div>
        </div>

        
      </div>
      
    </div>
  )
}

export default Cart;