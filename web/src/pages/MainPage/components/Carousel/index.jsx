import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"
import "swiper/css";
import "swiper/css/autoplay"

function Carousel() {

	return (
		<div className='flex h-[91vh] w-full z-10'>
			<Swiper 
				className="w-full h-full"
				autoplay={{
					delay: 20000,
				}}
				loop={true}
				modules={[Autoplay]}
			>
				<SwiperSlide>
					<ItemCarousel
						img="slider1.jpg"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<ItemCarousel
						img="book.jpeg"
					/>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
export default Carousel;

const ItemCarousel  = ({img, title, subText, name = 'image'}) =>{
	return(
		<SwiperSlide 
		>
			<div className='h-full w-full relative'>
				<img 
					src={img} 
					className='w-full h-full object-cover z-20'
					alt={name}
				/>
				<div className='text-slider absolute top-[20%] left-[10%]'>
						<h4 className="text-3xl font-normal font-subTitleTextCarousel text-mainTextColor">Primus inter pares</h4>
						<h5 className="bg-opacityBackgroundText text-4xl mt-8 text-mainTextColor font-medium p-2">
							Відокремлений структурний підрозділ
							<br />
							"ФАХОВИЙ КОЛЕДЖ
							<br />
							Чернівецького національного університету
							<br />
							імені Юрія Федьковича"
						</h5>
				</div>
			</div>
		</SwiperSlide>
	)
}