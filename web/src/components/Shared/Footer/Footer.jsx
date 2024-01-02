import React, { useEffect } from 'react';
import './Footer.css';
import SocialMediaIcon from '../../SocialMediaIcon';

const Footer = () => {
	return (
		<footer className='footer' id='footer'>
			<div className='w-10/12 mx-auto flex gap-10 h-[250px]'>
				<div class='w-full flex h-full'>
					<div className='h-4/6 w-2/12 my-auto'>
						<img src='./logo.png' alt='' className='h-full' />
					</div>
					<div className='w-4/12 flex flex-col'>
						<h4 className='text-xl mt-5'>Контактна інформація</h4>
						<hr className='my-2' />
						<div className='flex flex-col justify-between text-lg'>
							<p className='w-full text-lg mb-2 text-textFooter'>
								<i className='fas fa-map-marker-alt mr-2'></i>
								Поштовий індекс 58002 м. Чернівці вул. Банкова,
								1
							</p>
							<div className='text-textFooter mb-2 hover:text-mainTextColor cursor-pointer'>
								<i className='fas fa-phone-alt mr-2'></i>
								<span>(0372) 55-38-26</span>
							</div>
							<div className='text-textFooter hover:text-mainTextColor cursor-pointer'>
								<i className='fas fa-envelope mr-2'></i>
								<a href='mailto:college@chnu.edu.ua'>
									college@chnu.edu.ua
								</a>
							</div>
						</div>
					</div>
					<div className='w-6/12 ml-10 flex flex-col items-center'>
						<h4 className='text-5xl font-normal w-full text-center m-auto font-subTitleTextCarousel text-mainTextColor'>
							Primus inter pares
						</h4>
					</div>
				</div>
			</div>
			<div className='w-full h-20 bg-[#1f1f1f] flex'>
				<div className='w-10/12 mx-auto flex items-center'>
					<div className='w-6/12 flex justify-center'>
						<span>© 2023 Фaховий Коледжу ЧНУ</span>
					</div>
					<div className='w-6/12 flex justify-evenly'>
						<SocialMediaIcon name={'instagram'} />
						<SocialMediaIcon name={'facebook'} />
						<SocialMediaIcon name={'tiktok'} />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
