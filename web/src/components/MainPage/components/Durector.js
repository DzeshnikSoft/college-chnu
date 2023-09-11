import React from 'react'
import './Durector.css'
const Durector = () => {
  return (

    <div className= "durector">
        <div className="container">
            <div className="info-durector"> 
                <div className="header-durector">
                        <div className="element">
                            <div className="icon">
                                <img src="https://max-themes.net/demos/kingster/kingster/upload/icon-1.png" alt="" />
                            </div>
                            <div className="text">
                                <p>Життя коледжу</p>
                            </div>

                        </div>
                        <div className="element">
                            <div className="icon">
                                <img src="https://max-themes.net/demos/kingster/kingster/upload/icon-2.png" alt="" />
                            </div>
                            <div className="text">
                                <p>Спеціальності</p>
                            </div>

                        </div>
                        <div className="element">
                            <div className="icon">
                                <img src="https://max-themes.net/demos/kingster/kingster/upload/icon-3.png" alt="" />
                            </div>
                            <div className="text">
                                <p>Спорт</p>
                            </div>

                        </div>
                        <div className="element">
                            <div className="icon">
                                <img src="https://max-themes.net/demos/kingster/kingster/upload/icon-4.png" alt="" />
                            </div>
                            <div className="text">
                                <p>Студентський парламент</p>
                            </div>

                        </div>  
                </div>
                <div className="images-durector">
                    <div className="img-durector">
                        <img src="/Durector2.jpg" alt="" />
                    </div>
                    <div className="img-durector-info">
                        <div className="text">
                            <div className="res-text"><p>Відокремлений структурний підрозділ «Фаховий коледж Чернівецького національного університету 
                                імені Юрія Федьковича» є структурним підрозділом університету без статусу юридичної особи і 
                                надає освітні послуги, пов'язані з одержанням фахової передвищої освіти з одночасним наданням повної 
                                загальної середньої освіти.</p>
                                <p>Наш заклад освіти посідає одне з провідних місць серед закладів 
                                фахової передвищої освіти Чернівецької області.</p>
                            </div> 
                                <p className="cutata">Директор, ОЛЕКСАНДР СОБЧУК</p>
                        </div>
                       
                    </div>

                </div>
            </div>
        </div>
        
    </div>

  )
}

export default Durector;