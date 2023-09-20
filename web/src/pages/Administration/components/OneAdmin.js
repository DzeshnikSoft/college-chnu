import React from 'react'

const OneAdmin = ({item}) => {
  return (
    <div className='administration-info'>
              <img src= {item.image} alt = {item.pib}/>
              <div className='administration-text'>
                  <h1 className='administration-post'>
                      {item.posada}
                  </h1>
                  <p className='administration-name'>
                      {item.pib}
                  </p>
                  <p className='administration-work'>{item.status}</p>
              </div>
          </div>
  )
}

export default OneAdmin