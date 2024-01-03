import React from 'react';

function TitlePage({ children, url }) {
	return (
		<div className='h-72 w-full relative'>
			<img className='w-full h-full object-cover' src={url} alt='' />
			<div className='absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'>
				<span className='bg-opacityBackgroundText w-3/6 text-4xl mt-8 text-mainTextColor font-medium p-2'>
					{' '}
					{children}
				</span>
			</div>
		</div>
	);
}

export default TitlePage;
