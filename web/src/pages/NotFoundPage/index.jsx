import React from 'react';
import './NotFound.css';

const NotFoundPage = () => {
	return (
		<div className='flex w-full h-full m-auto'>
			<div className='flex w-11/12 h-5/6 m-auto'>
				<div className='w-6/12 flex flex-col justify-center items-center'>
					<p className='text-colorTextColor text-3xl text-center'>
						Помилка{' '}
						<span className='text-accentTextColor text-6xl font-semibold'>
							404
						</span>
					</p>
					<p className='text-colorTextColor text-center text-3xl'>
						Сторінка не знайдена...
					</p>
				</div>
				<div className='w-6/12'>
					<img
						src='https://i.ibb.co/6PB53fs/character-illustration-ukraine-flag-with-404-error-character-design-309278-2569.png'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
