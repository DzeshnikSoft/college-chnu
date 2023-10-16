import React from 'react';
import './style.css'

export default function List({items = []}){
	return(
		<ul className="list-speciliaty text-colorTextColor font-medium mr-5">
			{items.map((el) => (
				<li>{el}</li>
			))}
		</ul>
	)
}