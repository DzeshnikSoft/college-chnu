import React from 'react'

import './mainPage.css'

import CarouselWelcome from './components/CarouselWelcome'
import Director from './components/Director'
import AboutInfo from './components/aboutInfo'
import Courses from './components/Courses'
import NewsAndOther from './components/newsAndOther' 
import VideoPreview from './components/VideoPreview'
import Location from './components/Location'


const MainPage = () => {
  return (
    <div className= "h-fit">
      <CarouselWelcome/>
      <Director/>
      <AboutInfo/>
      <Courses/>
      <VideoPreview/>
      <NewsAndOther/>
      <Location/>
    </div>
  )
}

export default MainPage