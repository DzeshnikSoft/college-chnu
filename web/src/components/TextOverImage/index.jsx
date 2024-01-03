import React from 'react';

export default function TextOverImage({ children, src }) {
	return (
		<div className='h-full w-full relative'>
			<img
				src={src}
				className='w-full h-full object-cover z-20'
				loading='lazy'
			/>
			{children}
		</div>
	);
}
