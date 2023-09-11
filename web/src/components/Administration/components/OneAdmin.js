import React from 'react'
import { Divider } from '@mui/material';


const OneAdmin = ({item}) => {
  return (
    <div className='administration-info'>
              <img src= {item.image} alt = {item.pib}/>
              <div className='administration-text'>
                  <h1 className='administration-post'>
                      {item.posada}
                  </h1>
                  <p className='administration-name'>
                      <Divider>{item.pib}</Divider>
                  </p>
                  <p className='administration-work'>{item.status}</p>
              </div>
          </div>
  )
}

export default OneAdmin