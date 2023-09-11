import React, { useState } from 'react'
import './newsEdit.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SimpleModal from '../../SharedForAdmin/simpleModal'
const ItemNews = ({item}) => {
    let navigate = useNavigate();
    const [openModal, setOpenModal] = useState(true);
    
  return (
    <div className = "newsItem">
        <h2>{item.title}</h2>
        <div className="item">
            <div className="image">
                <img src={item.mainImage || "https://www.groupestate.gr/images/joomlart/demo/default.jpg"} alt={item.title} />
            </div>
            <div className="info">
                <p>{item.description}</p>
            </div>
        </div>
        <div className="crud_buttons">
            <Button color="secondary" onClick = {()=>navigate(`/admin/newsEdit/${item.id}`)}>Редагувати</Button>
            <Button variant="outlined" color="error" onClick = {()=>setOpenModal(true)}>
                Видалити новину
            </Button>
        </div>
        {
            openModal ? <SimpleModal handleClose = {setOpenModal(false)} handleSubmit={setOpenModal(false)}/>
            : <></>
        }
    </div>
  )
}

export default ItemNews