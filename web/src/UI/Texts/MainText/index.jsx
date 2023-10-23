import React from 'react';

export default function MainText({children, className = ''}){
	return(
		<p className={`text-colorTextColor text-xl font-normal indent-8 text-justify ${className}`}>
			{children}
		</p>
	)
}