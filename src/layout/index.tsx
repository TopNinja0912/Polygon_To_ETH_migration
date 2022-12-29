import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../app/store';
import chatavatar from '../assets/img/chat.png';
import {
    toggleSideBar
} from '../app/appSlice';

import Navbar from '../components/Nav/index'
import { menuitems, socialitems, externalitems } from '../core/data/Sidebar';

const Layout = ({children}:{children:any}) => {
    const dispatch = useDispatch();
    const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
    const isChatCollapsed = useSelector((state: RootState) => state.app.isChatCollapsed);
    const isTaskBoxCollapsed = useSelector((state: RootState) => state.app.isTaskBoxCollapsed);
    const authData = useSelector((state: RootState) => state.auth);
    return(
        <div className='w-full'>
            <div className="bg-black w-full min-h-screen">
                {children}
            </div>
            <div className="w-full fixed bottom-0 z-10 bg-gray">
                <Navbar menuitems={menuitems}/>
            </div>
        </div>
    )
}
export default Layout;