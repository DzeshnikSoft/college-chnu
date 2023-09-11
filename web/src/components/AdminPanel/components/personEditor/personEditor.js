import { Button, Divider, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AdministrationService from '../../../../Services/AdministrationService';
import { hideFooterAndHeader } from '../../../../Services/Helpers'
import './personEdit.css'
import { ClipLoader } from 'react-spinners';
import { styled } from '@mui/system';

const PersonEditor = () => {
    const defaultimage = "http://bppl.kkp.go.id/uploads/publikasi/karya_tulis_ilmiah/default.jpg"
    const [loading, setLoading] = useState(true);
    const {id} = useParams("");
    const [person, setPerson] = useState({});
    const [image, setImage] = useState("");
    const [pibField, setPibField] = useState("");
    const [posadaField, setPosadaField] = useState("")
    const [statusField, setStatusField] = useState("");

    
    const Input = styled('input')({
        display: 'none',
      });

    const service = new AdministrationService();    

    const saveInfo = (e) =>{
        e.preventDefault();
        const data = {
            pib : pibField,
            status : statusField,
            posada : posadaField, 
            image : image
        };

        console.log(data);

        (async () =>{
            const res = await service.updatePerson(person.id, data);
            console.log(res);
            if (res.status === 200 ){
                setTimeout(()=>window.location.reload(), 2000);
            }else alert("Виникла помилочка")
        })()
    }


    useEffect(()=>{
        hideFooterAndHeader();
        (async ()=>{
            const res = await service.getPersonById(id);
            console.log(res)
            if(res.status === 200){
                setPerson(res.data)
                setLoading(false);
                setImage(res.data.image);
                setPibField(res.data.pib)
                setPosadaField(res.data.posada);
                setStatusField(res.data.status);
    
            }else alert("Виникла помилка");
            
        })() 
    },[])
  return loading ?  <ClipLoader/> :
    <div className = "personEdit">
        <div className="title">
            <h1>Редагування персони  на сторінці адміністратора</h1>
        </div>
        <div className="container">
            <Divider/>
            <form className="editInfo" onSubmit = {(e)=>saveInfo(e)}>
                <TextField variant = "outlined" 
                    fullWidth = {true} 
                    defaultValue = {person.pib}
                    label = "ПІБ" sx ={{marginTop : '15px'}}
                    onChange ={(e)=>setPibField(e.target.value)} value = {pibField} required/>
                
                <TextField variant = "outlined" 
                    fullWidth = {true} 
                    defaultValue = {person.posada}
                    label = "ПОСАДА"  sx ={{marginTop : '15px'}} onChange ={(e)=>setPosadaField(e.target.value)} value = {posadaField} required/>
                
                <TextField variant = "outlined" 
                    fullWidth = {true} 
                    defaultValue = {person.status}
                    label = "КАТЕГОРІЯ"  sx ={{marginTop : '15px'}} onChange ={(e)=>setStatusField(e.target.value)} value = {statusField} required/>
                
                <h2>Завантаження фото</h2>
                <div className="image-upload">

                    <img src={image} alt={person.pib} />
                    <div className="buttons">
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button variant="contained" component="span">
                            Завантажити фото
                            </Button>
                        </label>
                        <Button variant = "contained" color = "error" onClick={()=>setImage(defaultimage)}>Видалити фото</Button>
                    </div>
                </div>

                <Button color = "success" variant = "contained" sx ={{width : "100%"}} type = "submit">Зберегти всі данні!</Button>
            </form>

        </div>
        

    </div>
}

export default PersonEditor