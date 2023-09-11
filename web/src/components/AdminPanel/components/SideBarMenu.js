import React, { useState } from 'react'
import './sidebar.css'
const SideBarMenu = ({setState}) => {
  const [menuState,setMenuState] = useState(null);
  const menuItems = [
    {
      name : "Головна"
    },
    {
      name : "Адміністрація"
    },
    {
      name : "Спеціальності"
    },
    {
      name : "Студенту"
    },
    {
      name : "Абітурієнту"
    },
    {
      name : "Студентський актив"
    },
    {
      name : "ОМО"
    },
    {
      name : "Новини"
    }
  ]


  return (
    <div className ="sidebar">
        <div className="title">
            <h1>Головне меню</h1> 
            <hr />
        </div>
        <ul className="menu_list">
            {
              menuItems.map((item, index)=>(
                <>
                <li onClick={()=>{
                  setState(index)
                  console.log(index)}
                }>{item.name}</li>
                  <hr/>
                  </>
              ))
            }
            
        </ul>
    </div>
  )
}

export default SideBarMenu