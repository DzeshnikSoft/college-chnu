import React from 'react';
import './Footer.css';
import SocialMediaIcon from '../../SocialMediaIcon';
import Location from '../../../pages/MainPage/components/Location';

const Footer = () => {
	return (
		<footer className='footer' id='footer'>
			<div className='w-full xl:w-full mx-auto flex gap-10 lg:h-fit lg:flex-col xl:h-[200px] h-[250px]'>
				<div className='w-full flex lg:flex-col-reverse h-full'>
					<div className='flex w-4/12 xlg:w-11/12 mx-auto xlg:justify-between'>
						<div className='h-40 xlg:h-32 xlg:w-32 lg:h-24 lg:w-24 w-40 mt-5 lg:my-auto mb-auto'>
							<img
								src='http://85.217.171.81/files/images/logo.png'
								alt=''
								className='h-full'
							/>
						</div>
						<div className='w-6/12 lg:w-7/12 flex flex-col xl:w-7/12 xl:ml-5 xlg:ml-0 lg:mb-3 pl-3 xlg:text-right'>
							<h4 className='text-xl xlg:text-base mt-5'>
								Контактна інформація
							</h4>
							<hr className='my-2' />
							<div className='flex flex-col justify-between text-lg'>
								<p className='w-full text-lg xlg:text-sm mb-2 text-textFooter'>
									<i className='fas fa-map-marker-alt mr-2'></i>
									Поштовий індекс 58002 м. Чернівці вул.
									Банкова, 1
								</p>
								<div className='text-textFooter xlg:text-sm mb-2 hover:text-mainTextColor cursor-pointer'>
									<i className='fas fa-phone-alt mr-2'></i>
									<span>(0372) 55-38-26</span>
								</div>
								<div className='text-textFooter xlg:text-sm hover:text-mainTextColor cursor-pointer'>
									<i className='fas fa-envelope mr-2'></i>
									<a href='mailto:college@chnu.edu.ua'>
										college@chnu.edu.ua
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className='w-6/12 lg:w-full ml-10 lg:ml-0 lg:h-full h-full flex justify-center items-center'>
						<Location />
					</div>
				</div>
			</div>
			<div className='w-full h-20 bg-[#1f1f1f] flex'>
				<div className='w-10/12 mx-auto flex items-center xlg:w-11/12 xlg:justify-between'>
					<div className='w-6/12 flex justify-start xlg:text-sm xlg:w-8/12'>
						<span>© 2024 Фaховий Коледжу ЧНУ</span>
					</div>
					<div className='w-6/12 flex justify-evenly xlg:w-4/12'>
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
