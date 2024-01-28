import React from 'react';

import './mainPage.css';

import CarouselWelcome from './components/CarouselWelcome';
import NewsMainPage from './components/NewsMainPage';
import Director from './components/Director';
// import AboutInfo from './components/aboutInfo'
// import Courses from './components/Courses'
// import VideoPreview from './components/VideoPreview';
// import Location from './components/Location';

const MainPage = () => {
	return (
		<div className='h-fit w-full'>
			<CarouselWelcome />
			<Director />
			<NewsMainPage />
			{/* <AboutInfo/> */}
			{/* <Courses/> */}
			{/* <VideoPreview/>
      <Location/> */}
		</div>
	);
};

export default MainPage;
