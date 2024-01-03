import React from 'react';
import { NavLink } from 'react-router-dom';

const SubMenu = ({ subMenu, parentUrl }) => {
	return (
		<div className='submenu w-fit max-w-[750px]'>
			{subMenu.map((subSubMenu) => (
				<div className='sub_submenu first:pl-5 w-[250px] chil '>
					{subMenu?.length > 1 && (
						<p className='text-xl text-colorTextColor mt-3'>
							{subSubMenu.title}
						</p>
					)}
					<ul>
						{subSubMenu?.pages?.map((el) => (
							<li className='last:mb-3 first:mt-3' key={el.id}>
								<NavLink
									to={`/${parentUrl}/${subSubMenu.url}/${el.url}`}
									className={({ isActive }) =>
										isActive
											? 'text-colorTextColor font-bold'
											: `hover:text-colorTextColor hover:font-bold `
									}>
									{el.title}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default SubMenu;
