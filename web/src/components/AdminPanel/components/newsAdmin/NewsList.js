import React, { useEffect, useState } from 'react'
import NewsService from '../../../../Services/NewsService';
import ItemNews from './ItemNews';
import { Divider } from '@mui/material';
import {FadeLoader} from 'react-spinners';


const NewsList = () => {
  const [news, setNews] = useState([]);
  let newsService = new NewsService();
  const [loading, setLoading] = useState(true);



  useEffect(()=>{
    newsService.getAllNews().then((res)=>{
      console.log(res.data);
      setNews(res.data);
      console.log(res.data);
      setLoading(false)
    })
  },[])


  return loading ? <FadeLoader/> : 
    <div className = "newsList">
      {
        news?.map((item, index)=>(
          <>
            
            <ItemNews item ={item}/>
            <Divider/>
          </>
        ))
      }
    </div>
}

export default NewsList