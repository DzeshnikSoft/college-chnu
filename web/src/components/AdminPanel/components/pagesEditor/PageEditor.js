import React, { useEffect,useState } from 'react'
import './pageEditor.css';
import Editor from '../../SharedForAdmin/Editor'
import { useNavigate, useParams } from 'react-router';
import PageService from '../../../../Services/PageService';
import { FadeLoader } from 'react-spinners';
import { TextField, Select, MenuItem, InputLabel, Button } from '@mui/material';
import { hideFooterAndHeader } from '../../../../Services/Helpers';


const PageEditor = () => {
  const {id} = useParams();
  const {section} = useParams();
  let pageService = new PageService();
  const [page, setPage] = useState({});
  const[loading, setLoading] = useState(true);
  const [sectionField, setSection]= useState(section);
  const [title, setTitle] = useState(page?.title);
  const [pageInfo, setPageInfo] = useState("");
  let navigate = useNavigate();

  useEffect(()=>{
    console.log(id);
    console.log(section);
    hideFooterAndHeader();
    if(id !== undefined){
      (async ()=>{
        const res = await pageService.getPageById(id);
        setPage(res.data);
        console.log(res);
        setTitle(res?.data?.title);
        setLoading(false);
      })()
      
    }else setLoading(false);
    
  },[])

  const handleCreate = (e) =>{
    e.preventDefault();
    console.log("create");
    const data = {
      title : title,
      pageInfo : pageInfo,
      section : sectionField
    }
    pageService.createPage(data).then((res)=>{
      console.log(res);
      if(res.status === 200){
        window.location = (`/${section}/${res.data.id}`); 
      }else {
        alert("Щось пішло не так :( ");
      }
    })
  }

  const handleUpdate = (e) =>{
    e.preventDefault();
    console.log("update");
    const data = {
      title : title,
      pageInfo : pageInfo,
      section : sectionField
    }
    console.log(data)
    pageService.updatePage(id,data).then((res)=>{
      console.log(res);
      if(res.status === 200){
        window.location = (`/${section}/${id}`); 
      }else {
        alert("Щось пішло не так :( ");
      }
    })
  }



  return loading ?  <FadeLoader/> :
    <div className ="pageEditor">

        <form className="container" onSubmit = {(e)=> id === undefined ? handleCreate(e) : handleUpdate(e) }>
          <div className="mainbutton">
          <Button variant ="contained" color = "success" type ="submit">Зберегти сторінку</Button>

          </div>
          <div className="title">
            <TextField variant = "outlined" sx={{width : "100%"}} label ="Назва сторінки" required defaultValue = {page.title || ""} value ={title} onChange ={(e)=>setTitle(e.target.value)}/>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={sectionField}
              onChange={(e)=>setSection(e.target.value)}
              autoWidth
              label="Секція"
            >
              <MenuItem value={"speciality"}>Спеціальності</MenuItem>
              <MenuItem value={"student"}>Студенту</MenuItem>
              <MenuItem value={"entrant"}>Абітурієнту</MenuItem>
              <MenuItem value={"studparlament"}>Самоврядування</MenuItem>
              <MenuItem value={"omo"}>ОМО</MenuItem>
            </Select>
          </div>
          <Editor pageInfo = {page.pageInfo || ""} setPageInfo ={setPageInfo}/>
        </form>
      
    </div>
  
}

export default PageEditor