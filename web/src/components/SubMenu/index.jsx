import React from "react";
import { NavLink } from "react-router-dom";

const SubMenu = ({ subMenu }) => {
	return (
		<div className='submenu w-fit max-w-[750px]'>
			{subMenu.map(
				(subSubMenu) => (
					<div className='sub_submenu first:pl-5 w-[250px] chil '>
						{subMenu?.length > 1 && (
							<p className='text-xl text-colorTextColor mt-3'>
								{subSubMenu.title}
							</p>
						)}
						<ul>
							{subSubMenu?.links?.map((el) => (
								<li
									className='last:mb-3 first:mt-3'
									key={el.path}>
									<NavLink
										to={el.path}
										className={({ isActive }) =>
											isActive
												? "text-colorTextColor font-bold"
												: `hover:text-colorTextColor hover:font-bold `
										}>
										{el.name}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				)
			)}
		</div>
	);
};

export default SubMenu;