
import React, { useEffect, useState } from 'react'
import PageService from '../../../../Services/PageService';
import { FadeLoader } from 'react-spinners';
import {Link} from 'react-router-dom'
import Button from '../../../../UI/Buttons/Button';
import './pagesList.css'
import { useNavigate } from 'react-router'

const PagesList = ({section}) => {
    const [pages, setPages] = useState([]);
    const [loading,setLoading] = useState(false);
    let navigate = useNavigate();
    let pageService = new PageService();


    useEffect(()=>{
        setLoading(true);
        pageService.getPageBySection(section).then((res)=>{
            console.log(res);
            setPages(res.data);
            setLoading(false)
        })
    },[section])

  return loading ?  <FadeLoader/> :
    <div className = "pagesList">
        <div className="button_new">
            <Button variant = "contained" onClick ={()=> navigate(`/admin/createNewPage/${section}`)}>Створити нову сторінку</Button>
            <hr />
        </div>
        <div className="list">
            {
                pages.map((page, index)=><div className = "item">
                    <h1><Link to = {`/admin/editPage/${section}/${page.id}`}>{page.title}</Link></h1>
                </div>)
            } 
        </div>
    </div>
  
}

export default PagesList

