import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { FadeLoader } from 'react-spinners';
import PageService from '../../../Services/PageService';
import './page.css'

import SideBar from './SideBar';
const Page = () => {
    const {id} = useParams();
    const [page, setPage] = useState({});
    const [loading, setLoading] = useState(true);
    let pageService = new PageService();


    useEffect(()=>{
      (async ()=>{
        const res = await pageService.getPageById(id);
        setPage(res.data);
        console.log(res);
        setLoading(false);
      })()
        
    },[id])
    
    

  return <div className ="page">
      <div className = "container">
          <div className="title">
            <h1>{page.title}</h1>
          </div>
          
            <div className="pageInfo"  >
            <div class="fr-view" dangerouslySetInnerHTML={{ __html: page.pageInfo }}></div>
            
            </div>
          
      </div>
    </div>
}

export default Page