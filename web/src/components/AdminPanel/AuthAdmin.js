import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { hideFooterAndHeader } from '../../Services/Helpers'
import './AuthAdmin.css';

const AuthAdmin = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        hideFooterAndHeader();

    },[])

    const auth = (e) =>{
        e.preventDefault();
        if(login === "admin" && login !== '' && password === "admin" && password !== ""){
            const admin = {
                login : login
            };
            localStorage.setItem("Admin", JSON.stringify(admin))
            window.location = '/admin'
        }else alert('Не правильний логін або пароль');
    }
  return (
    <div className = "authAdmin">
    
        <form onSubmit = {(e)=>auth(e)} className = "auth">
            <h1>Увійдіть у аккаунт адміністратора</h1>
            <TextField label = "Логін" sx ={{margin : "20px 0"}} onChange = {(e)=>setLogin(e.target.value)} value = {login} />
            <TextField label = "Пароль" sx ={{margin : "20px 0"}} type ='password' onChange = {(e)=>setPassword(e.target.value)} value = {password}/>
            <Button type = 'submit' color = 'success' variant = 'contained'>Увійти</Button>
        </form> 
    </div>
  )
}

export default AuthAdmin