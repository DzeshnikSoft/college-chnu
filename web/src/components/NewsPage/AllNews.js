import React, { useEffect, useState } from 'react'
import "./AllNews.css"
import NewsService from "../../Services/NewsService";
import Pagination from '@mui/material/Pagination';
import { ParseDate } from '../../Services/Helpers';

function AllNews() {

    const [pagincount,setPagincount]= useState();
    const [news, setNews] = useState([]);
    let newsService = new NewsService();

    const handleChange = ( event,value) => {
        setPagincount( value);
      };
      useEffect(() => {
        
          
          setPagincount(1);
        },[]);

    useEffect(()=>{
        (async()=>{
            const res = await newsService.getAllNews();
            setNews(res.data); 
        })()   
      },[])
  return (
    <div className="allnews">
        <div className="title-news">
            <h4>Новини</h4>
        </div>
        <div className="container">
            { 
            news?.map((item, index)=>(
                index>=(pagincount-1)*5 && index<(pagincount)*5 &&
                <div className="element-news">
                    <div className="image-news">
                        <img src={item.mainImage}  alt="" />
                    </div>
                    <div className="text-news">
                        <h3>{item.title}</h3>
                         <p>{item.description}</p>
                         <a href="/рпарапрпа">Детальніше</a>
                         <p className="date-image">{ParseDate(item.date)}</p>
                    </div>

                 </div>
             ))

            }
             <Pagination count={Math.ceil(news.length/5)} value={pagincount}  onChange={handleChange}/>
            
        </div>

    </div>
  );
}

export default AllNews;
