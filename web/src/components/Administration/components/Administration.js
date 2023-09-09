import React, { useEffect, useState } from 'react';
import './Administration.css'
import {Divider} from '@mui/material'

import AdministrationService from '../../../Services/AdministrationService';
import OneAdmin from './OneAdmin';

function Administration() {
    const administrationService = new AdministrationService();
    const [administration, setAdministration] = useState([]);


    useEffect(()=>{
        (async ()=>{
            const res = await administrationService.getAllPerson();
            console.log(res);
            setAdministration(res.data);
        })()
        
    },[])
  return  <div className='administration'>
  {
  administration?.map((item) => <div className='container'>
          <OneAdmin item ={item}/>
      </div>
  
  )
}
    </div>
}

export default Administration