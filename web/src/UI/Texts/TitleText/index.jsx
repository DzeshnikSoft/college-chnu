import React from 'react';

export default function TitleText({children, className = ''}){
	return(
		<p className={`text-colorTextColor text-center text-2xl mb-3 ${className}`}>
			{children}
		</p>
	)
}