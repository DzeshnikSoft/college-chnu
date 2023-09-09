import './Slider.css';
import React, { useEffect ,useState  } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
function Carousel() {
    
    const sliderSettings = {
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        infinite: true,
        pauseOnHover:true,
      }
    
  return (
    <div className="slider">
     <Slider  {...sliderSettings}> 
        <div className="element-slider">
            
             <img src="/slider1.jpg" alt="" />
          
            <div className="text-slider">
            <h4>Primus inter pares</h4>
            <h5>Відокремлений структурний підрозділ<br/>"ФАХОВИЙ КОЛЕДЖ 
                <br/>Чернівецького національного університету<br/> 
                імені Юрія Федьковича"</h5>
                 <button>Детальніше</button>   
            </div>
        </div>
        <div className="element-slider">    
        <img src="/book.jpeg" alt="" />
            <div className="text-slider">
                <h4>Найбільший вибір спеціальностей</h4>
                <h5>Ми чекаємо на тебе!!!</h5>
                <button>Детальніше</button>
            </div>
        </div>
        
     </Slider>
    

    </div>
  );
}

export default Carousel;
