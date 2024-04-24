import React from 'react';

function TitlePage({ children, url }) {
	return (
		<div className='h-72 lg:h-60 w-full relative'>
			<img className='w-full h-full object-cover' src={url} alt='' />
			<div className='absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'>
				<p className='bg-opacityBackgroundText w-3/6 text-center laptopXl:!w-fit text-4xl lg:text-2xl text-mainTextColor font-medium p-2'>
					{' '}
					{children}
				</p>
			</div>
		</div>
	);
}

export default TitlePage;
