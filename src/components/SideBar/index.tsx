import React, { useState } from 'react';
import TreeMenu from 'react-simple-tree-menu';
import { SidebarItem, SidebarProps } from '../../core/interfaces/Sidebar';
import * as IconModule from '../../core/data/CustomSvg/CustomSvg'

import {useHistory } from 'react-router-dom';
import { SvgProps } from '../../core/interfaces/Svg';
import logo from '../../logo.png';
import avatar from '../../assets/img/avatar.png';
import {treeData} from '../../core/data/Tree';
import '../../../node_modules/react-simple-tree-menu/dist/main.css';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleSideBar,setCurrentIndex
} from '../../app/appSlice';
import {
  setuserstate,
} from '../../app/authSlice';

const SideBar = (props: SidebarProps) => {
  const IconSVG = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
  const authData = useSelector((state: RootState) => state.auth);
  const currentIndex = useSelector((state: RootState) => state.app.currentIndex);
  const history = useHistory();
  const dispatch = useDispatch();
  const navigation = (item: any) => {
    console.log(history);
    if(item.name == "Sign Out")
    {
      localStorage.removeItem('userData');
      dispatch(setuserstate({isLogged:false, username:"",userRole:"",image:"", password:"", id: "", email: "", cellPhone: "", officePhone: "", address: "", birthday: "", token: "" }));
    }
    dispatch(setCurrentIndex(item.name));
    return history.push(`${item.url}`)
  }
  const avatarImage = authData.image == "" ? avatar : authData.image;
  
    return (
      <div className="flex flex-col justify-between items-between w-280 px-35 border-r-2 border-blueviolet h-full bg-white">
        <div className ="header flex flex-col">
          <div className="">
              <div className="brand">
                <img src={logo} className="mx-auto" width="226px" height="83px" alt="avatar" />
              </div>
              <div className="avatar mt-20" onClick={()=>navigation({url:'/profile',name:'profile'})}>
                <div className='z-0'>
                  <img src={avatarImage} className="rounded-full mx-auto" width="100px" height="100px" alt="avatar" />
                </div>
                <div className="relative w-90 h-25 z-40 -mt-20  text-center rounded-full text-white mx-auto cursor-pointer bg-gradient-to-r from-orange to-pink" >Edit Profile</div>
              </div>
              <div className="avatar-title text-center mt-5">
                <h3 className="text-18 font-cabin font-semibold">{authData.username}</h3>
                <h4 className="text-16 font-cabin font-regular text-blueviolet">{authData.email}</h4>
              </div>
          </div>
          <div className="ml-30 mt-30">
          {/* <TreeMenu data={treeData} onClickItem={({ key, label, ...props }) => {
            navigation(props.url)
     // user defined prop
  }}/> */}
              {
                
                props.menuitems.map((item: SidebarItem, index) => {
                  console.log(currentIndex);
                  if(item.name == currentIndex)
                  {
                    return (
                      <div className="flex rounded-md items-center w-200 h-50 my-10 cursor-pointer bg-lightblue grab hover:text-alto" key={item.name} onClick={()=>navigation(item)}>
                        <img className="ml-10 w-24 h-24" height="24px" width="24px" src={item.icon}/>
                        <span className="ml-10 my-auto text-blueviolet text-16 font-cabin font-medium">{item.name}</span>
                      </div>
                    )
                  }
                  else
                  {
                  return (
                    <div className="flex items-center w-200 h-50 my-10 cursor-pointer grab hover:text-alto" key={item.name} onClick={()=>navigation(item)}>
                      <img className="ml-10  w-24 h-24" height="24px" width="24px" src={item.icon}/>
                      <span className="ml-10 my-auto text-blueviolet text-16 font-cabin font-medium">{item.name}</span>
                    </div>
                  )
                  }
                })
              }
          </div>
          {/* <div className="ml-30 mb-40">
            <div className ="text-white mt-10 px-35">
              <p>Bond discounts</p>
              <div className = "py-5">
                <a href="/#/bonds/shib">
                  <div className="flex justify-between">
                    <p>SHIB</p>
                    <p>99.49%</p>
                  </div>
                </a>
              </div>
              <div className = "py-5">
                <a href="/#/bonds/shib">
                  <div className="flex justify-between">
                    <p>SHIB</p>
                    <p>99.49%</p>
                  </div>
                </a>
              </div>
              <div className = "py-5">
                <a href="/#/bonds/shib">
                  <div className="flex justify-between">
                    <p>SHIB</p>
                    <p>99.49%</p>
                  </div>
                </a>
              </div>
              <div className = "py-5">
                <a href="/#/bonds/shib">
                  <div className="flex justify-between">
                    <p>SHIB</p>
                    <p>99.49%</p>
                  </div>
                </a>
              </div>
            </div>
          </div> */}
          {/* <div className= "externalitems ml-30">
            {
              props.externalitems.map((item: SidebarItem, index) => {
                const Icon = IconSVG[`${item.icon}`];

                return (
                  <a className="flex items-center my-10 cursor-pointer grab hover:text-alto" href={item.url} key={item.name}>
                      <Icon width="20px" fill="white" className="mr-10"/>
                      <span className="text-white text-17 font-semibold">{item.name}</span>
                    </a>
                )
              })
            }
          </div> */}
        </div>
        <div className="footer flex justify-around">
          {/* {
            props.socialitems.map((item: SidebarItem, index) => {
              const Icon = IconSVG[`${item.icon}`];

              return (
                <a className="flex items-center my-10 cursor-pointer grab hover:text-alto" href={item.url} key={item.name}>
                    <Icon width="20px" fill="white" className="mr-10"/>
                  </a>
              )
            })
          } */}
        </div>

      </div>
    )
  }
  
  export default SideBar;