import React, { useEffect,forwardRef, useState, memo,useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CollapseIcon } from '../../core/data/CustomSvg/CustomSvg';
import { SidebarItem, SidebarProps } from '../../core/interfaces/Sidebar';
import { ProductItem } from '../../core/interfaces/Product';
import { Box, Button, TextField, FormControlLabel, Checkbox, Snackbar, CircularProgress } from '@material-ui/core';
import {useHistory } from 'react-router-dom';
import {
  toggleSideBar,setCurrentIndex
} from '../../app/appSlice';
import styles from './styles.module.css';
import {
  setuserstate,
} from '../../app/authSlice';
import { RootState } from '../../app/store';
import logo from '../../logo.png';
const Card = (props:any) => {
    const appData = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const currentIndex = useSelector((state: RootState) => state.app.currentIndex);
    const history = useHistory();
    const navigation = (item: any) => {
      dispatch(setCurrentIndex(item.name));
      return history.push(`${item.url}`)
    }
    const [cardhover, setcardhover] = useState(false);
    let actioncontent;
    return (
      <div className={styles.whenhovered} onClick={()=>navigation({url:props.item.url,name:props.item.name})}>
        <div className="brand h-full">
          <img src={window.location.origin + props.item.image} className="w-full h-full" alt="avatar" />
        </div>
        <div className={styles.content}>
          <p className="text-16 font-cabin font-semibold text-white">{props.item.category}</p>
          <h2 className="text-28 font-cabin font-semibold text-white">{props.item.name}</h2>
        </div>        
      </div>
    )
  }
  
  export default Card;