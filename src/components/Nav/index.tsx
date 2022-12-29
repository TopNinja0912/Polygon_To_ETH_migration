import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CollapseIcon } from '../../core/data/CustomSvg/CustomSvg';
import { CloseIcon } from '../../core/data/CustomSvg/CustomSvg';
import { SidebarItem, SidebarProps } from '../../core/interfaces/Sidebar';
import { Box, Button, TextField, FormControlLabel, Checkbox, Snackbar, CircularProgress } from '@material-ui/core';
import {useHistory } from 'react-router-dom';
import {
  toggleSideBar,setCurrentIndex
} from '../../app/appSlice';
import {
  setuserstate,
} from '../../app/authSlice';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import './index.css';
import { RootState } from '../../app/store';
import logo from '../../logo.png';
import { current } from '@reduxjs/toolkit';
const Nav = (props:any) => {
    const appData = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [menu, setmenu] = useState(false);
    const currentIndex = useSelector((state: RootState) => state.app.currentIndex);
    const history = useHistory();
    const navigation = (item: any) => {
      console.log(history);
      if(item.name == "Sign Out")
      {
        localStorage.removeItem('userData');
        dispatch(setuserstate({isLogged:false, username:"",userRole:"",image:"", password:"", id: "", email: "", cellPhone: "", officePhone: "", address: "", birthday: "", token: "" }));
      }
      dispatch(setCurrentIndex(item.name));
      setmenu(false);      
      return history.push(`${item.url}`)
    }
    const [web3Instance, setWeb3Instance] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    let date = new Date();
    let todayweek = date.toUTCString().split(" ").at(0);
    let todayday = date.toUTCString().split(" ").at(1);
    let todaymonth =date.toUTCString().split(" ").at(2);
    let todayyear = date.toUTCString().split(" ").at(3);

    let actioncontent;
    useEffect(() => {
      const effect = async () => {
          await loadWeb3();        
      }
      effect();        
    }, []);
    const connectMetamask = async () => {
      try {
        let currentProvider = await detectEthereumProvider();
        if (currentProvider) {
          // let web3InstanceCopy = new Web3(currentProvider);
          // setWeb3Instance(web3InstanceCopy);
          if (!window.ethereum.selectedAddress) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
          }
          await window.ethereum.enable();
          let address = window.ethereum.selectedAddress;
          const currentChainId = await window.web3.eth.net.getId()
          if (currentChainId !== 80001) {
              try {
                    await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    // params: [{ chainId: Web3.utils.toHex(80001) }],
                  });
                  setCurrentAddress(address);
                  localStorage.setItem('currentAddress', address);
              } catch (switchError) {
            }
          } else {
              setCurrentAddress(address);              
              localStorage.setItem('currentAddress', address);
              console.log(address);
          }
        }
      } catch (err:any) {
          alert(err.message)
      }
  }
  const loadWeb3 = async () => {
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          window.ethereum.enable();
      }
  }
  const disconnect = async () => {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
          {
              eth_accounts: { currentAddress }
          }
      ]
    });
  }
    return (
      <div className="flex flex-grow w-full h-75 bg-gray md:h-75 md:pb-10">
        <div className="brand" onClick={()=>navigation({url:'/',name:'shop'})}>
          <img src={logo} className="mx-auto absolute bottom-0" width="160px" height="160px" alt="avatar" />
        </div>
        <div className="hidden flex-grow w-full justify-between md:max-w-750 h-75  pl-202 px-35 max-w-0 md:flex">
          {
              props.menuitems.map((item: SidebarItem) => {
                console.log(currentIndex);
                if(item.name == currentIndex)
                {
                  return (
                    <div className="flex rounded-md items-center  h-50 my-10 cursor-pointer grab hover:text-alto" key={item.name} onClick={()=>navigation(item)}>
                      <span className="ml-10 my-auto text-lightblue text-16 font-cabin font-medium">{item.name}</span>
                    </div>
                  )
                }
                else
                {
                return (
                  <div className="flex items-center  h-50 my-10 cursor-pointer grab hover:text-alto" key={item.name} onClick={()=>navigation(item)}>
                    <span className="ml-10 my-auto text-white text-16 font-cabin font-medium">{item.name}</span>
                  </div>
                )
                }
              })
          }
        </div>
        {/* <div className='btn btn-blue align-self-center' onClick={connectMetamask}>Connect wallet</div> */}
        {currentAddress == "" && (<div className='btn btn-blue align-self-center' onClick={connectMetamask}>Connect wallet</div>)}
        {currentAddress != "" && (<div className='btn btn-blue align-self-center' onClick={disconnect}>{currentAddress.slice(0, 5) + '...' + currentAddress.slice(currentAddress.length - 6, currentAddress.length)}</div>)}
        <div className="flex justify-center static items-center cursor-pointer ml-auto bg-blueviolet w-75 h-75 "
          onClick = {()=>setmenu(!menu)}>       
            <CollapseIcon width="20px" fill='blackviolet'/>
        </div>
        {menu  && (
          <div className="h-screen w-full bg-gray fixed top-0 left-0">
            <div className="block ml-50">
            {
                props.menuitems.map((item: SidebarItem) => {
                  console.log(currentIndex);
                  if(item.name == currentIndex)
                  {
                    return (
                      <div className="w-full flex rounded-md items-center  h-75 my-10 cursor-pointer grab hover:text-alto" key={item.name} onClick={()=>navigation(item)}>
                        <span className="ml-10 my-auto text-lightblue text-46 font-cabin font-medium">{item.name}</span>
                      </div>
                    )
                  }
                  else
                  {
                  return (
                    <div className="w-full flex items-center  h-75 my-10 cursor-pointer grab hover:text-alto" key={item.name} onClick={()=>navigation(item)}>
                      <span className="ml-10 my-auto text-white text-46 font-cabin font-medium">{item.name}</span>
                    </div>
                  )
                  }
                })
            }
          </div>
          <div className="fixed bottom-0 right-0 z-10 cursor-pointer bg-blueviolet w-75 h-75 flex justify-center static items-center"
            onClick = {()=>setmenu(false)}>       
              <CloseIcon width="20px" fill='blackviolet'/>
          </div>
          </div>
        )}
      </div>
    )
  }
  
  export default Nav;