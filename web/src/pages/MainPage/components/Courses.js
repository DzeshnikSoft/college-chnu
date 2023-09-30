import React from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  return (
    <div className='courses'>
        <div className='container'>
          <div className='courses-text'>
              <p className='courses-text-title'>ПІДГОТОВЧІ КУРСИ<br />
                для вступу до ВСП "Фаховий коледж ЧНУ імені Юрія Федьковича" у 2022 р. 
              </p>
              <p className='courses-text-intro'>
                На підготовчі курси приймаються  учні 9-10 класів для підготовки до вступних іспитів...
              </p>
            </div>
            <div className="courses-icon-arrow">
              <Link to='/'><p className="courses-button">Детальніше <i className="fas fa-angle-right"></i></p></Link>
            </div>
        </div>
    </div>
  )
}

export default Courses