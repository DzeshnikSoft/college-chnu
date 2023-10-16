import React from 'react';

export default function AccentText({children, className = ''}){
	return(
		<span className={`text-accentTextColor font-medium ${className}`}>
			{children}
		</span>
	)
}