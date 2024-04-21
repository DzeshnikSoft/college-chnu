import React from 'react';
import TextOverImage from '../../../../../../components/TextOverImage';
import 'swiper/css';

const ItemCarouselWelcome = ({ img, title, subText, name = 'image' }) => {
	return (
		<TextOverImage src={img} alt={name}>
			<div className='text-slider absolute top-[20%] left-[10%]'>
				<h4 className='text-3xl xlg:text-lg font-normal xs:text-sm w-3/6 md:text-xs font-subTitleTextCarousel text-mainTextColor'>
					{subText}
				</h4>
				<h5 className='bg-opacityBackgroundText w-3/6 text-4xl mt-8 text-mainTextColor md:text-base xs:text-sm md:w-4/6 xlg:text-xl xl:text-3xl font-medium p-2'>
					{title}
				</h5>
			</div>
		</TextOverImage>
	);
};

export default ItemCarouselWelcome;
