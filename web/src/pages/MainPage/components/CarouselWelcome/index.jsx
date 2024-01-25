import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ItemCarouselWelcome from './component/ItemCarouselWelcome';
import 'swiper/css';
import 'swiper/css/autoplay';

function CarouselWelcome() {
	return (
		<div className='flex h-relativelyHeaderFullScreen w-full z-10'>
			<Swiper
				className='w-full h-full'
				autoplay={{
					delay: 20000,
				}}
				loop={true}
				modules={[Autoplay]}>
				<SwiperSlide>
					<ItemCarouselWelcome
						img='slider1.jpg'
						title='Відокремлений структурний підрозділ
						"ФАХОВИЙ КОЛЕДЖ
						Чернівецького національного університету
						імені Юрія Федьковича"'
						subText='Primus inter pares'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<ItemCarouselWelcome
						img='book.jpeg'
						title='Відокремлений структурний підрозділ
						"ФАХОВИЙ КОЛЕДЖ
						Чернівецького національного університету
						імені Юрія Федьковича"'
						subText='Primus inter pares'
					/>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
export default CarouselWelcome;
