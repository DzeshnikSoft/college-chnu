import React from 'react'
import LinksOther from '../LinksOther/LinksOther';
import './Footer.css';

const Footer = () => {
    const submit = (e)=>{
        e.preventDefault();
    }
  return (
      <>
      
    <div className="footer" id = "footer">
        <div className="container">
            <div class='footer-info'>
                <img src="https://i.ibb.co/HPGjHnN/main-1-removebg-preview.png" alt="" />
                <p className="footer-text"> 
                Поштовий індекс 58002 <br />
                м. Чернівці вул. Банкова, 1 <br />
                Навчальний корпус №20.<br />
                </p>
                <span>(0372) 55-38-26</span><br />
                <a href='college@chnu.edu.ua'>college@chnu.edu.ua</a><br />
                <hr />
            </div>
            <div className="list">
                <div className="footer-title">Спеціальності</div>
                <hr />
                <ul>
                    <li>Підприємство, торг. та БД</li>
                    <li>Право</li>
                    <li>Campus Safety</li>
                    <li>Фінанси, банківська справа та страхування</li>
                    <li>Облік і оподаткування</li>
                    <li>Human Resources</li>
                </ul>
            </div>
            <div className="list">
                <div className="footer-title">Send us feedback</div>
                <hr />
                <form onSubmit={(e)=> submit(e)} className="form-feedback">      
                    <input  type="text" className="feedback-input" placeholder="Ім'я" />   
                    <input  type="text" className="feedback-input" placeholder="Пошта" />
                    <textarea   placeholder="Коментар" />
                    <button type="submit"  className='submit'>Надіслати</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer