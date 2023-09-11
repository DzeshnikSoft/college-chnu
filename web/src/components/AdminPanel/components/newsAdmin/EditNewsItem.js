import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { hideFooterAndHeader } from '../../../../Services/Helpers';
import NewsService from '../../../../Services/NewsService';
import PagesEditor from '../../SharedForAdmin/Editor';
import {FadeLoader} from 'react-spinners';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
const EditNewsItem = () => {
    const {id} =  useParams();
    const [news,setNews] = useState({});
    const [date,setDate] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pageInfo, setPageInfo] = useState("");
    const [image, setImage] = useState("");



    let newsService = new NewsService();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        hideFooterAndHeader();
        newsService.getNewsById(id).then((res)=>{
            console.log(res);
            setNews(res.data);
            setLoading(false);
        })
    },[])


    const SaveNews = () => {
        const newData = {
            title : title || news.title,
            pageInfo : pageInfo || news.pageInfo,
            description : description || news.description,
            date : date || news.date,
            mainImage : image || news.mainImage
        }

        console.log(newData);
        newsService.updateNews(id, newData).then((res)=>{
            console.log(res);
            if(res.status ===200){
                alert("Данні успішно змінено");
                window.location.reload(false);
            }
            
        })
        
    }
  return !loading ?
    <div className = "editNews"> 
        <div className="container">
            <div className="title">
                <h1>Редагування новини</h1>
                <Button variant="contained" color="success" sx = {{width : "200px", margin : "0 auto"}} onClick = {()=>SaveNews()}>
                    Зберегти
                </Button>
            </div> 
            <div className="mainInformation">
                <div className="line">
                    <TextField id="outlined-basic" label="Заголовок" variant="outlined" defaultValue ={news.title} onChange ={(e)=>setTitle(e.target.value)}/>
                    <TextField
                        id="date"
                        label="Дата створення"
                        type="date"
                        sx={{ width: "100%" }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        defaultValue = {news.date.slice(0,10)}
                        onChange ={(e)=>{console.log(e.target.value);setDate(e.target.value)}}
                    />
                </div>
                <div className="line">
                    <TextField
                        id="outlined-multiline-static"
                        label="Опис"
                        multiline
                        minRows ={15}
                        defaultValue = {news.description}
                        onChange ={(e)=>{setDescription(e.target.value); }}
                    />
                    <div className="imageUploadfield">
                        <img src={news.mainImage} alt={news.title} />
                        <Button variant="contained">Змінити фото</Button>
                    </div>
                </div>
            </div>
            <PagesEditor pageInfo = {news.pageInfo} setPageInfo = {setPageInfo}/>
        </div>
    </div> : <FadeLoader css = {{margin : "auto"}}/>
  
}

export default EditNewsItem