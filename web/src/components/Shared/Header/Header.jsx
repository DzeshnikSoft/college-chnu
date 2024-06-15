import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getNavMenuData } from '../../../app/features/navMenu/navMenuSlice';
import { useSelector } from 'react-redux';
import SubMenu from '../../SubMenu';
import useMediaQuery from '../../../hooks/useMediaQuery';
import LaptopNavBar from './components/LaptopNavBar';
import './Header.css';

function Header() {
	const navMenuData = useSelector(getNavMenuData);
	const isLaptop = useMediaQuery('(max-width: 1025px)');
	const [isNavBarLaptop, setIsNavBarLaptop] = useState(false);

	const toogleNavBarLaptop = () => {
		setIsNavBarLaptop(!isNavBarLaptop);
	};

	return (
		<header className='header md:!h-[7vh] z-50 w-full flex sticky top-0 bg-backgroundHeaderColor text-colorTextColor shadow-bottomShadow'>
			{isLaptop ? (
				<div className='w-11/12 mx-auto flex justify-between items-center'>
					<div className='h-5/6 relative'>
						<img
							src='logo-header.png'
							alt='Логотип'
							className='h-full relative'
							loading='lazy'
						/>
					</div>
					<div
						onClick={toogleNavBarLaptop}
						className='w-10 h-10 md:w-6 md:h-6 flex flex-col justify-between'>
						<div className='w-full md:h-1 h-1.5 bg-[#204966] rounded-xl'></div>
						<div className='ml-auto w-8/12  md:h-1 h-1.5 bg-[#204966] rounded-xl'></div>
						<div className='w-full h-1.5 md:h-1 bg-[#204966] rounded-xl'></div>
					</div>
					{isNavBarLaptop && (
						<LaptopNavBar
							handleClose={toogleNavBarLaptop}
							navMenuData={navMenuData}
						/>
					)}
				</div>
			) : (
				<div className='w-4/5 flex items-center mx-auto justify-between'>
					<div className='w-2/5 h-full'>
						<img
							src='./logo-header.png'
							alt='Логотип'
							className='h-full'
						/>
					</div>
					<div className='menu w-fit h-full mr-0 ml-auto items-center justify-end text-textColor'>
						<ul className='topmenu flex h-full items-center text-xl'>
							<li className='mx-5 hover:text-accentTextColor flex cursor-pointer h-full font-medium'>
								<NavLink
									to='/'
									className='h-full flex items-center'>
									Коледж
								</NavLink>
								<SubMenu
									subMenu={[
										{
											id: '3fa85f64-5717-4562-b3fc-2c9gdggdgdgdf66afa6',
											url: '',
											title: 'Про коледж',
											categoryId:
												'3fa85f64-5717-4562-b3fc-2c963f66afa6',
											pages: [
												{
													id: '3fa85f64-5717-4562-ffff-2c963f66afa6',
													url: '',
													title: 'Всі новини',
													content: 'string',
													textContent: 'string',
													subCategoryId:
														'3fa85f64-5717-4562-b3fc-2c963f66afa6',
													template: {
														type: 0,
														image: {
															url: 'string',
															alt: 'string',
														},
														label: 'string',
													},
												},
											],
										},
									]}
									parentUrl='news'
									isCustomData={true}
								/>
							</li>
							{navMenuData &&
								navMenuData?.map((item, index) => (
									<li
										key={index}
										className='mx-5 hover:text-accentTextColor flex cursor-pointer h-full font-medium'>
										{item.subCategories.length !== 0 && (
											<SubMenu
												subMenu={item.subCategories}
												parentUrl={item.url}
											/>
										)}
										<NavLink
											to={`/${item.url}`}
											onClick={(e) => e.preventDefault()}
											className='h-full flex items-center'>
											{item.title}
										</NavLink>
									</li>
								))}
							<li className='mx-5 hover:text-accentTextColor flex cursor-pointer h-full font-medium'>
								<NavLink
									to='/search'
									className='h-full flex items-center'>
									<i className='fa-solid fa-magnifying-glass m-auto'></i>
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			)}
		</header>
	);
}

export default Header;
