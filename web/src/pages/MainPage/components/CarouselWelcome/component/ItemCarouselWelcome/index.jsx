import React from "react";

import "swiper/css";

const ItemCarouselWelcome  = ({img, title, subText, name = 'image'}) =>{
	return(
		<div className='h-full w-full relative'>
			<img 
				src={img} 
				className='w-full h-full object-cover z-20'
				alt={name}
			/>
			<div className='text-slider absolute top-[20%] left-[10%]'>
				<h4 className="text-3xl font-normal w-3/6 font-subTitleTextCarousel text-mainTextColor">{subText}</h4>
				<h5 className="bg-opacityBackgroundText w-3/6 text-4xl mt-8 text-mainTextColor font-medium p-2">{title}</h5>
			</div>
		</div>
	)
}

export default ItemCarouselWelcome;