import React,{useState, useEffect} from 'react'
import { hideFooterAndHeader } from '../../../../Services/Helpers';
import { Divider, TextField, Button, Input } from '@mui/material';
import { styled } from '@mui/system';
import AdministrationService from '../../../../Services/AdministrationService';


const PersonCreate = () => {
  const defaultimage = "http://bppl.kkp.go.id/uploads/publikasi/karya_tulis_ilmiah/default.jpg"

  const [image, setImage] = useState("");
    const [pibField, setPibField] = useState("");
    const [posadaField, setPosadaField] = useState("")
    const [statusField, setStatusField] = useState("");

  useEffect(() => {
    hideFooterAndHeader();
    setImage(defaultimage);
    
  }, [])
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
          const res = await service.insertPerson(data);
          console.log(res);
          if (res.status === 200 ){
              setTimeout(()=>window.location.reload(), 2000);
          }else alert("Виникла помилочка")
      })()
  }

  return (
    <div className = "personEdit">
    <div className="title">
        <h1>Редагування персони  на сторінці адміністратора</h1>
    </div>
    <div className="container">
        <Divider/>
        <form className="editInfo" onSubmit = {(e)=>saveInfo(e)}>
            <TextField variant = "outlined" 
                fullWidth = {true} 
                label = "ПІБ" sx ={{marginTop : '15px'}}
                onChange ={(e)=>setPibField(e.target.value)} value = {pibField} required/>
            
            <TextField variant = "outlined" 
                fullWidth = {true} 
                
                label = "ПОСАДА"  sx ={{marginTop : '15px'}} onChange ={(e)=>setPosadaField(e.target.value)} value = {posadaField} required/>
            
            <TextField variant = "outlined" 
                fullWidth = {true} 
                
                label = "КАТЕГОРІЯ"  sx ={{marginTop : '15px'}} onChange ={(e)=>setStatusField(e.target.value)} value = {statusField} required/>
            
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
    

</div>
  )
}

export default PersonCreate