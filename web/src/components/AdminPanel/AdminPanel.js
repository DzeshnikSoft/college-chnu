import React, {useEffect, useState} from 'react'
import AdminHeader from './components/adminHeader';
import './admin.css'
import SideBarMenu from './components/SideBarMenu';
import MainArea from './components/MainArea';
import { hideFooterAndHeader } from '../../Services/Helpers';
const AdminPanel = () => {

  const [menuState, setMenuState] = useState(null);

    useEffect(()=>{
        localStorage.getItem("Admin")=== null ||  localStorage.getItem("Admin")=== undefined ? window.location = '/admin/auth' : console.log("admin") ;
        hideFooterAndHeader();
    },[])

  return (
    <>
       <AdminHeader/>
       <div className="adminContent">
            <SideBarMenu setState = {setMenuState}/>
            <MainArea menuState = {menuState}/>
       </div>
    </>
  )
}

export default AdminPanel