import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
	fetchCategoriesData,
	getNavMenuData,
} from '../../../app/features/navMenu/navMenuSlice';
import { useSelector, useDispatch } from 'react-redux';
import SubMenu from '../../SubMenu';
import './Header.css';

function Header() {
	const dispatch = useDispatch();
	const navMenuData = useSelector(getNavMenuData);
	const params = useParams();

	useEffect(() => {}, []);

	return (
		<header className='header z-50 w-full flex sticky top-0 bg-backgroundHeaderColor text-colorTextColor shadow-bottomShadow'>
			<div className='w-4/5 flex items-center mx-auto'>
				<div className='w-2/5 h-full'>
					<img
						src='./logo-header.png'
						alt='Логотип'
						className='h-full'
					/>
				</div>

				<div className='menu w-fit h-full mr-0 ml-auto items-center text-textColor'>
					<ul className='topmenu flex h-full items-center text-xl'>
						<li className='mx-5 hover:text-accentTextColor flex cursor-pointer h-full font-medium'>
							<NavLink
								to='/'
								className='h-full flex items-center'>
								Головна
							</NavLink>
						</li>
						{navMenuData &&
							navMenuData?.map((item) => (
								<li className='mx-5 hover:text-accentTextColor flex cursor-pointer h-full font-medium'>
									{item.subCategories.length !== 0 && (
										<SubMenu
											subMenu={item.subCategories}
											parentUrl={item.url}
										/>
									)}
									<NavLink
										to={`/${item.url}`}
										className='h-full flex items-center'>
										{item.title}
									</NavLink>
								</li>
							))}
					</ul>
				</div>
			</div>
		</header>
	);
}

export default Header;
