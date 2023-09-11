import React from 'react'
import AboutInfo from './aboutInfo'
import './mainPage.css'
import Carousel from './components/Slider'
import Durector from './components/Durector'

import NewsAndOther from './newsAndOther'
import Courses from './components/Courses'
import Location from './components/Location'
import VideoPreview from './components/VideoPreview'

const MainPage = () => {
  return (
    <div className= "mainpage">
      <Carousel/>
      <Durector/>
      <AboutInfo/>
      <Courses />
      <VideoPreview/>
      <NewsAndOther/>
      <Location/>
    </div>
  )
}

export default MainPage