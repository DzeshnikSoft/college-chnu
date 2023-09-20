import React,{ useEffect,useState } from 'react';
import { NavLink,Link } from 'react-router-dom';
import PageService from "../../../Services/PageService"
import axios from 'axios';
import {useMedia} from 'react-use-media'
import { MENU_ITEMS } from '../../../utils/constants';
import { useLocation } from 'react-router';
import './Header.css'

function Header() {
    
    return (
        <header 
            className="header h-[10vh] w-full flex sticky top-0 bg-backgroundHeaderColor z-20 shadow-bottomShadow" 
            id = "header"
            
        >
        <div className="container flex">
       
            <div className="img h-full">
                <img 
                    src="https://i.ibb.co/j3ShSfG/main-1.png"
                    alt="Логотип"
                    className='h-full' 
                />
            </div>
           
         <div className="menu w-fit h-full mr-0 ml-auto items-center text-textColor">
                  <ul className = "topmenu flex h-full items-center text-xl">
                        {
                            MENU_ITEMS.map((item) => (
                                <li  
                                    key={item.path}
                                    className='mx-5 hover:text-accentTextColor cursor-pointer font-medium'
                                >
                                        <NavLink to={item.path}>{item.name}</NavLink>
                                        {item.subMenu.length !== 0 && 
                                            <ul className="submenu">
                                               {item.subMenu.map((elem)=>(
                                                    <li> 
                                                        <NavLink to={elem.path}>{elem.name}</NavLink>
                                                    </li>
                                               ))}  
                                            </ul>
                                        }
                                </li>
                            ))
                        }
                  </ul>
              </div>
              </div>
      </header>
    );
  }
  
  export default Header;
  