import { Divider } from '@mui/material'
import React from 'react'
import './NotFound.css'

const NotFoundComponent = () => {
  return (
    <div className = "notFound">
        <div className="container">
            <div className="cool">
                <h1 style = {{fontSize : 120, color : "#1A3853"}}>Помилка 404</h1>
                <h1 style = {{color : "#26B27C"}}>Сторінка не знайдена...</h1>
                
            </div>
            <img src="https://i.ibb.co/6PB53fs/character-illustration-ukraine-flag-with-404-error-character-design-309278-2569.png" alt="" />
        </div>
    </div>
  )
}

export default NotFoundComponent