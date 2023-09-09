import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ClipLoader } from 'react-spinners';
import NewsService from '../../Services/NewsService';
import  './SingleNews.css';

const SingleNews = () => {  
    const {id} = useParams("");
    const [news,setNews] = useState({});
    const service = new NewsService();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        (async ()=>{
            const res = await service.getNewsById(id);
            console.log(res);
            setNews(res.data);
            setLoading(false);
        })()
    },[])
  return loading ? <div className = "loader"><ClipLoader size = {200}/></div>: 
    <div className = "singleNews">
        <div className="container">
            <div className="title">
                <Divider><h1>{news.title}</h1></Divider>
            </div>
            <div className="news-shortBlock">
                <div className="image">
                    <img src={news.mainImage} alt= {"newsImage"} />
                </div>
                <div className="description">
                    <p>{news.description}</p>
                </div>
            </div>
            <Divider sx ={{margin : "20px 0"}}/>
            <div className="news_article"  dangerouslySetInnerHTML={{ __html: news.pageInfo }}></div>
        </div>
        
    </div>
  
}

export default SingleNews