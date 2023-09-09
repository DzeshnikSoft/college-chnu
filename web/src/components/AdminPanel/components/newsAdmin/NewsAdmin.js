import React from 'react'
import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import './newsEdit.css'
import NewsList from './NewsList'

const NewsAdmin = () => {
  let navigate = useNavigate();

  return (
    <div className = "newsAdmin">
        <div className="tools">
          <Button variant="contained" onClick = {()=>navigate("/admin/create/news")}>Додати новину</Button>
          <hr />
        </div>
        <NewsList/>
    </div>
  )
}

export default NewsAdmin