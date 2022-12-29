import { useSelector } from 'react-redux';
import React, { useEffect, useState, memo } from 'react';
import { Country, State, City } from 'country-state-city';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import driver from 'bigchaindb-driver'
import { Paper, Grid, Zoom } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Formik, Field } from "formik";
import yup, { string, number } from "yup";
import * as Yup from "yup";
import { RootState } from '../../app/store';
import {CONTRACTADDRESS, TokenABI} from '../../app/contractInformation'
import Card from '../../components/Card/index'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bg from '../../assets/img/bg.png';
import './index.css';
// Import Interfaces`
import csc from "country-state-city";
// import Select from "react-select";
// import csc from "country-state-city";
import { useFormik } from "formik";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { userInfo } from 'os';
import axios from 'axios';
import BigNumber from "bignumber.js";
import { TokenClass } from 'typescript';
import {useHistory } from 'react-router-dom';


let conn:any;


const CheckOut = () => {

  const driver = require('bigchaindb-driver')
  const base58 = require('bs58');
  const crypto = require('crypto');


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [street, setStreet] = useState('');
  const [town, setTown] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const wrapper = React.createRef();
  const appData = useSelector((state: RootState) => state.app);
  const [stateValue, setStateValue] = useState([]);
  let para: any = useParams();
  let statesValue: Object[] = [];
  const countries = Country.getAllCountries();
  const states = State.getAllStates();
  const history = useHistory(); 
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const updatedCountries = countries.map((country, key) => ({
    label: country.name,
    value: key.toString(),
    ...country
  }));
  const [defaultCountry, setDefaultCountry] = useState(updatedCountries[0]);
  const [updateState, setUpdateState] = useState<any[]>([]);

  const [defaultState, setDefaultState] = useState(updateState[0]);
  const selectCountry = async (e: any) => {
    const temp = states.filter((value) => value.countryCode == updatedCountries[e['value']].isoCode);
    const temp2 = temp.map((value, key) => ({
      label: value.name,
      value: key.toString(),
      ...value
    }));
    setCountry(e['label']);
    setCountryValue(e['value']);
    setUpdateState(temp2);
    setDefaultCountry(updatedCountries[e['value']]);
  }
  const selectState = async (e: any) => {
    setState(e['label']);
    setStateValue(e['value']);
  }
  const applyCheckOut = () => {
    const userInfo = {
      firstName: firstName,
      lastName: lastName,
      country: country,
      countryValue: countryValue,
      street: street,
      town: town,
      state: state,
      stateValue: stateValue,
      zipCode: zipCode,
      phone: phone,
      email: email
    }
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
  useEffect(() => {
    const storeUserInfo = localStorage.getItem('userInfo');
    if (storeUserInfo) {
      const userInfo = JSON.parse(storeUserInfo);
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setDefaultCountry(updatedCountries[userInfo.countryValue]);
      setStreet(userInfo.street);
      setTown(userInfo.town);
      const temp = states.filter((value) => value.name == userInfo.state);
      const temp2 = temp.map((value, key) => ({
        label: value.name,
        value: key.toString(),
        ...value
      }));
      setDefaultState(temp2[0]);
      setZipCode(userInfo.zipCode);
      setPhone(userInfo.phone);
      setEmail(userInfo.email);
    }
    const temp = states.filter((value) => value.countryCode == updatedCountries[0].isoCode);
    const temp2 = temp.map((value, key) => ({
      label: value.name,
      value: key.toString(),
      ...value
    }));
    setUpdateState(temp2);
  }, []);

  const buyItem = async (flag: any) => {    
    const _token = await new  window.web3.eth.Contract(TokenABI, CONTRACTADDRESS);
    const currentAddress = localStorage.getItem('currentAddress');
    const _tokenPrice:any = await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=MATICUSDT');
    if (flag == 1) {
        const buyItem = localStorage.getItem('buyItem');
        if(buyItem) {
          const buyData = JSON.parse(buyItem);
          const buyAmount = Number(buyData.price)/Number(_tokenPrice.data.price*100000);
          console.log(buyAmount);
          await _token.methods.depositToken()
            .send({
                from: currentAddress,
                value: BigNumber(buyAmount*1000000000000000000)
            }, function(error:any, tokens:any){
                if(tokens){
                  console.log(tokens);
                  // history.push('/cart');
                }
            });
            SaveData(buyAmount);
        }
    }
    else if(flag == 2) {
      const cartItem = localStorage.getItem('cartData');
      if(cartItem) {
        const cartData = JSON.parse(cartItem);
        // console.log(cartData);
        let totalPrice = 0;
        cartData.map((value:any) => {
          totalPrice += Number(value.price);
        })
        const buyAmount = Number(totalPrice)/Number(_tokenPrice.data.price*100000);
          console.log(buyAmount);
          await _token.methods.depositToken()
            .send({
                from: currentAddress,
                value: BigNumber(buyAmount*1000000000000000000)
            }, function(error:any, tokens:any){
                if(tokens){
                  console.log(tokens);
                  // history.push('/cart');
                }
            });
            localStorage.removeItem('cartData');
            SaveData(buyAmount);
      }
    }
  }
  const SaveData = async (amount:any) => {
    await _getConnection();
    const aliceKeypair = new driver.Ed25519Keypair()

    const condition = driver.Transaction.makeEd25519Condition(aliceKeypair.publicKey, true);
    console.log(aliceKeypair);
    console.log(condition);
    const asset = {
      'timestamp': new Date()
    };
    const metadata = {
      'random_data': Math.random()
    };
    const output = driver.Transaction.makeOutput(condition);
    output.public_keys = [aliceKeypair.publicKey];
    const transaction = driver.Transaction.makeCreateTransaction(
      asset,
      metadata,
      [output],
      aliceKeypair.publicKey
    );
  
    const txSigned = driver.Transaction.signTransaction(transaction, aliceKeypair.privateKey);
  
    try {
      let tx = await conn.postTransaction(txSigned)
      alert("transaction hash: "+tx.id)
      return tx
    } catch (error) {
      console.error(error);
      return false
    }
  }

  return (
    <div className="w-full ">
      <div className={`h-full bg-blackgray md:fixed top-0 left-0 w-12/12 md:w-5/12`}>
        <img src={bg} className="w-full h-full" alt="avatar" />
      </div>
      <div className="block h-screen  scrollbar-hide w-12/12 md:w-7/12 px-70 pt-23 pb-50 ml-auto">
        <div className='product-description pb-10'>
          <h3 className="text-45 font-cabin font-semibold text-white">Billing and Shipping</h3>
        </div>
        <div>
          <div className='d-flex'>
            <div>
              <p className='text-white py-5'>Frist name <span className='text-red'>*</span></p>
              <input type='text' className='form-control mt-2' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className='pl-24'>
              <p className='text-white py-5'>Last name <span className='text-red'>*</span></p>
              <input type='text' className='form-control mt-2' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div><div className='btn btn-primary mt-30 ml-75'><p className='text-white' onClick={() => applyCheckOut()}>Apply CheckOut</p></div></div>
            <div><div className='btn btn-warning mt-30 ml-14'><p className='text-white font-bold' onClick={() => buyItem(para.id)}>Buy Item</p></div></div>
          </div>
          <div>
            <p className='text-white py-5'>Country and region <span className='text-red'>*</span></p>
            {/* <select name="country" id="country" className='form-control' onChange={(e) => selectState(e)}>
              {updatedCountries.map((value, key) => {
                return (<option>{value.name}</option>)
              })}
            </select> */}
            <Dropdown onChange={(e) => selectCountry(e)} options={updatedCountries} value={defaultCountry} placeholder="Select an option" />
          </div>
          <div>
            <p className='text-white py-5'>Street address <span className='text-red'>*</span></p>
            <input type='text' className='form-control mt-2' placeholder='House Number and Street name' value={street} onChange={(e) => setStreet(e.target.value)} />
          </div>
          <div>
            <p className='text-white py-5'>Town / city <span className='text-red'>*</span></p>
            <input type='text' className='form-control mt-2' value={town} onChange={(e) => setTown(e.target.value)} />
          </div>
          <div>
            <p className='text-white py-5'>State <span className='text-red'>*</span></p>
            <Dropdown onChange={(e) => selectState(e)} options={updateState} value={defaultState} placeholder="Select an option" />
          </div>
          <div>
            <p className='text-white py-5'>Zip code <span className='text-red'>*</span></p>
            <input type='text' className='form-control mt-2' value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          </div>
          <div>
            <p className='text-white py-5'>Phone <span className='text-red'>*</span></p>
            <input type='text' className='form-control mt-2' value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <p className='text-white py-5'>Email address <span className='text-red'>*</span></p>
            <input type='text' className='form-control mt-2' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>


      </div>

    </div>
  )
}

export default CheckOut;
export async function _getConnection() {
  if (!conn) {
    conn = new driver.Connection("https://12.34.56.78:9984/api/v1/");
  }
}