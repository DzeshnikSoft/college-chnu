import { TextField } from '@mui/material';
import React, { useEffect,useState } from 'react'
import { hideFooterAndHeader } from '../../../../Services/Helpers'
import './createSp.css';
import { Button, Input } from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router';
import StudParlamentService from '../../../../Services/StudParlamentServices';

const CreateStudParlament = ({isCreate}) => {
    const defaultimage = "http://bppl.kkp.go.id/uploads/publikasi/karya_tulis_ilmiah/default.jpg"
    const {id} = useParams();
    const service = new StudParlamentService();
    const [image, setImage] = useState("");
    const [pibField, setPibField] = useState("");
    const [posadaField, setPosadaField] = useState("")
    const [statusField, setStatusField] = useState("");
  
    useEffect(()=>{
        hideFooterAndHeader();
        setImage(defaultimage);
        if(isCreate){
            
        }
    },[])

    const Input = styled('input')({
        display: 'none',
      });
    
  return isCreate ? 
    <div className = "createStudParlament">
        <h1>Додати члена студпарламенту</h1>

        <form  className="createdInfo">
            <TextField label = "ПІБ" sx = {{margin : "10px 0"}}/>
            <TextField label = "Посада в студпарламенті" sx = {{margin : "10px 0"}}/>
            <h2>Завантаження фото</h2>
            <div className="image-upload">

                <img src={image} alt={"image"} />
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
            <Button color = "success" variant = "contained" sx ={{width : "100%"}} type = "submit">Додати персону</Button>
        </form>
    </div>
   : <div className = "createStudParlament">
   <h1>Редагувати нового члена студпарламенту</h1>
   <div className="createdInfo">
       <TextField label = "ПІБ" sx = {{margin : "10px 0"}}/>
       <TextField label = "Посада в студпарламенті" sx = {{margin : "10px 0"}}/>
       <h2>Завантаження фото</h2>
       <div className="image-upload">

           <img src={image} alt={"image"} />
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
      
       <Button color = "success" variant = "contained" sx ={{width : "100%"}} type = "submit">Додати персону</Button>
   </div>
</div>
}

export default CreateStudParlament