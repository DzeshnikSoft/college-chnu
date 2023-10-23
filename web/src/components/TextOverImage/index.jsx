import React from "react"

export default function TextOverImage({children, src, alt}){
	return(
		<div className='h-full w-full relative'>
			<img 
				src={src} 
				className='w-full h-full object-cover z-20'
				alt={alt}
				loading="lazy"
			/>
			{children}
		</div>
	)
}