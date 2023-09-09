import { Button, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AdministrationService from '../../../../Services/AdministrationService'
import OneAdmin from '../../../Administration/components/OneAdmin';
import './Administrator.css'

const AdministrationAdmin = () => {
    const service = new AdministrationService();
    const [arrays, setArrays] = useState([]);

    useEffect(()=>{
        (async ()=>{
            const res = await service.getAllPerson();
            console.log(res)
            setArrays(res.data);
        })()
    },[])

    const deletePerson = (id) =>{
        service.deletePerson(id).then(res=>{
            if(res.status ===200) window.location.reload();
            else alert("Виникла помилка");
        })
    }
  return (
    <div className ="administration-admin">
        <div className="controls-buttons">
            <Button variant = 'contained' sx = {{margin : "0 auto"}}>Додати нову персону</Button>
        </div>
        <div className="container">
            <div className="elements">
            {arrays?.map((item)=>
            <div className = "item">
                <Divider/>
                    <h1>{item.pib}</h1>
                    <div className="buttons">
                        <Button variant = "contained" color = "error" onClick = {()=>deletePerson(item.id)}>Видалити</Button>
                        <Button variant = "contained" onClick = {()=>window.location = `/admin/editPerson/${item.id}`}>Редагувати</Button>
                    </div>
                <Divider/>
            </div>    
        )
        }
            </div>
        </div>  
    </div>
  )
}

export default AdministrationAdmin