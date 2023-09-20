import Button from '../../../../UI/Buttons/Button'
import React, { useEffect, useState } from 'react'
import StudParlamentService from '../../../../Services/StudParlamentServices'
import './studParlament.css'


const StudParlament = () => {
  const studService = new StudParlamentService();
  const [SP, setSP] = useState();
  const [loading, setLoading] = useState(true);
    useEffect(()=>{
        studService.getAllStudParlament().then( res => {
          setSP(res.data);
          setLoading(true);
        });
    },[])
  return (
    <div className = "studParlament">
        <div className="buttonss">
            <Button variant = "contained" onClick ={()=>window.location = "/admin/createNewPersonStudParlament"}>Додати нового члена СП</Button>
        </div>
        <div className="students">
            {SP?.map((item, index)=>(
              <>
              <div className = "student">
                  <div className="image">
                      <img src={item.image} alt={item.pib} />
                  </div>
                  <div className="info">
                      <h2>{item.pib}</h2>
                      <p>{item.posada}</p>
                  </div>
              </div>  
              </>  
            ))
              
            }
        </div>
    </div>
  )
}

export default StudParlament