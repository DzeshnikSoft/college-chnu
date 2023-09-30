import React,{useState}from 'react'
import './LinksOther.css'
import Slider from "react-slick"
import {TransitionGroup} from 'react-transition-group';
const LinksOther = () => {

    const [subblock, setSubblock] = useState(false);
    const [arrow,setArrow] = useState(false)

    const settings = {
        dots:false,
        infinity:true,
        arrows:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1
    }
  return (
    <div className= "linksother">
      <div className="container">
            <div className="mainblock">
                <div className="links">
                    <a href=""><img src="http://college-chnu.cv.ua/pages/MainPage/images/monu.jpeg" alt="" /></a>
                    <a href=""><img src="http://college-chnu.cv.ua/pages/MainPage/images/chnu_banner.jpeg" alt="" /></a>
                    <a href=""><img src="http://college-chnu.cv.ua/pages/MainPage/images/oda.jpeg" alt="" /></a>
                    <a href=""><img src="http://college-chnu.cv.ua/pages/MainPage/images/quality.jpg" alt="" /></a>     
                </div>
                <div className="arrow">
                  {!arrow ? <i onClick={()=>{setSubblock(true);setArrow(true)}} class="fas fa-angle-down"></i>: <i onClick={()=>{setSubblock(false);setArrow(false)}} class="fas fa-angle-up"></i>}  
                  
                </div>
            </div>
            
           {subblock ?

           <div className= "subblock">
               <Slider {...settings}>
                   <div className="elem-slick">
                        <a href=""><img src="http://college-chnu.cv.ua/pages/MainPage/images/la_strada.gif" alt="" /></a>
                        <a href=""><img src="http://college-chnu.cv.ua/pages/MainPage/images/parlament.jpg" alt="" /></a>
                        <a href=""><img src="http://college-chnu.cv.ua/pages/MainPage/images/profspilka.jpg" alt="" /></a>
                        <a href=""><img src="http://college-chnu.cv.ua/pages/MainPage/images/ped-presa.jpg" alt="" /></a>
                   </div>
                <div className="elem-slick">
                    <a href=""><img src="http://college-chnu.cv.ua/pages/MainPage/images/la_strada.gif" alt="" /></a>
                </div>
               </Slider>

               
            </div>  : <></>}
           
            
            
      </div>
    </div>
  )
}

export default LinksOther