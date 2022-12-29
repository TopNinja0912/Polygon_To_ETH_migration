import React from 'react';
import { AppItem, AppItems } from '../../core/interfaces/Apps';
import * as IconModule from '../../core/data/CustomSvg/CustomSvg'
import {Link} from 'react-router-dom';
import { SvgProps } from '../../core/interfaces/Svg';
import logo from '../../logo.svg';

const Apps = (props: AppItems) => {
  const IconSVG = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
    return (
      <div className="flex flex-col justify-between items-between">
        <div className ="header flex flex-col">
            <div className="title text-left mt-5 ml-10">
            <h3 className="text-20 font-cabin">Links</h3>
            </div>
            <div className="mt-10 w-full flex">
              {
                
                props.appitems.map((item: AppItem, index) => {
                  // let imgurl = require(`${item.icon}`);
                  // console.log(imgurl);
                  return (
                    <div className={`w-full block   mb-10 mx-10`}>
                        <div className="flex flex-center flex-row bg-white px-10 py-10">
                          <img src={window.location.origin + item.icon} className="rounded-full mx-auto my-auto" width="70px" height="70px" alt="logo" />
                        </div>
                        <div className=" pt-5">
                        <a className="flex text-center justify-center cursor-pointer grab hover:text-alto" key={item.name} href={item.url}>
                        <span className="text-blueviolet text-17 font-semibold">{item.name}</span>
                        </a>
                        </div>
                    </div>
                  )
                })
              }
          </div>
          
        </div>
      </div>
    )
  }
  
  export default Apps;