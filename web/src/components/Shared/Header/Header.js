import React from "react";
import { NavLink } from "react-router-dom";

import SubMenu from "../../SubMenu";
import { MENU_ITEMS } from "../../../utils/constants";
import "./Header.css";

function Header() {
	return (
		<header
			className='header h-[9vh] w-full flex sticky top-0 bg-backgroundHeaderColor text-colorTextColor z-20 shadow-bottomShadow'
			id='header'>
			<div className='w-4/5 flex items-center mx-auto'>
				<div className='w-2/5 h-full'>
					{/* <img 
                    src="https://i.ibb.co/j3ShSfG/main-1.png"
                    alt="Логотип"
                    className='h-full' 
                /> */}
				</div>

				<div className='menu w-fit h-full mr-0 ml-auto items-center text-textColor'>
					<ul className='topmenu flex h-full items-center text-xl'>
						{MENU_ITEMS.map((item) => (
							<li className='mx-5 hover:text-accentTextColor flex cursor-pointer h-full font-medium'>
								<NavLink
									to={item.path}
									className='h-full flex items-center'>
									{item.name}
								</NavLink>
								{item.subMenu.length !== 0 && (
									<SubMenu subMenu={item?.subMenu} />
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</header>
	);
}

export default Header;
