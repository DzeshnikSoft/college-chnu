import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavBarStage from '../NavBarStage';
import NavMenuItem from '../NavMenuItem';
function LaptopNavBar({ handleClose, navMenuData }) {
	const [stage, setStage] = useState({
		index: 0,
		items: [...navMenuData],
		prevItems: [],
		titles: [],
		paths: [],
	});

	const selectStage = () => {
		switch (stage.index) {
			case 0:
				return (
					<NavBarStage>
						<li className='mx-5 text-colorTextColor text-lg my-4 flex cursor-pointer h-full font-medium w-11/12'>
							<NavLink
								to='/'
								className={({ isActive }) =>
									isActive
										? 'text-colorTextColor font-black text-xl  h-full flex items-center'
										: `hover:text-colorTextColor hover:font-black text-xl  h-full flex items-center`
								}>
								Головна
							</NavLink>
						</li>
						{stage.items &&
							stage.items?.map(
								(item) =>
									item.subCategories?.length > 0 && (
										<NavMenuItem
											onClick={(e) => {
												e.preventDefault();
												categoryStageClick(item);
											}}
											to={`/${item.url}`}
											item={item}
										/>
									)
							)}
					</NavBarStage>
				);
			case 1:
				return (
					<NavBarStage>
						<div className='border-b-2 px-5 h-20 text-xl font-black flex'>
							<button onClick={subCategoryPrevStageClick}>
								<i className='fa-solid fa-angle-left'></i>
							</button>
							{stage.titles.map((item, index) => (
								<div className='text-colorTextColor h-full flex items-center justify-center text-lg'>
									<span className='mx-2'>{item}</span>
								</div>
							))}
						</div>
						{stage.items &&
							stage.items?.map(
								(item) =>
									item.pages?.length > 0 && (
										<NavMenuItem
											onClick={(e) => {
												e.preventDefault();
												subCategoryStageClick(item);
											}}
											to={`/${stage.paths[0]}/${item.url}`}
											item={item}
										/>
									)
							)}
					</NavBarStage>
				);
			case 2:
				return (
					<NavBarStage>
						<div className='border-b-2 px-5 h-20 text-xl font-black flex'>
							<button onClick={subSubCategoryPrevStageClick}>
								<i className='fa-solid fa-angle-left'></i>
							</button>
							{stage.titles.map((item, index) => (
								<div className='text-colorTextColor h-full flex items-center justify-center text-lg'>
									<span className='mx-2'>{item}</span>
									{index === 0 &&
										stage.titles.length === 2 && (
											<span className='mt-0'>/</span>
										)}
								</div>
							))}
						</div>
						{stage.items &&
							stage.items?.map((item) => (
								<NavMenuItem
									onClick={handleClose}
									to={`/${stage.paths[0]}/${stage.paths[1]}/${item.url}`}
									item={item}
								/>
							))}
					</NavBarStage>
				);
			default:
				break;
		}
	};

	const subCategoryStageClick = (item) => {
		if (stage.items.length > 1) {
			setStage({
				index: stage.index + 1,
				items: item.pages,
				prevItems: stage.items,
				paths: [...stage.paths, item.url],
				titles: [...stage.titles, item.title],
			});
		}
	};

	const categoryStageClick = (item) => {
		if (item.subCategories.length > 1) {
			setStage({
				index: stage.index + 1,
				items: item.subCategories,
				prevItems: [...navMenuData],
				paths: [item.url],
				titles: [item.title],
			});
		}
		if (item.subCategories.length === 1) {
			setStage({
				index: stage.index + 2,
				items: item.subCategories[0].pages,
				prevItems: [...navMenuData],
				paths: [item.url, item.subCategories[0].url],
				titles: [...stage.titles, item.title],
			});
		}
	};

	const subCategoryPrevStageClick = () => {
		setStage({
			index: stage.index - 1,
			items: [...navMenuData],
			prevItems: stage.prevItems,
			paths: [],
			titles: [],
		});
	};

	const subSubCategoryPrevStageClick = (item) => {
		setStage({
			index:
				stage.titles.length === 2
					? stage.index - 1
					: stage.titles.length === 1 && stage.index - 2,
			items: stage.prevItems,
			prevItems: navMenuData,
			paths:
				stage.paths.length === 2
					? [stage.paths[0]]
					: stage.paths.length === 1 && [],
			titles:
				stage.titles.length === 2
					? [stage.titles[0]]
					: stage.titles.length === 1 && [],
		});
	};

	return (
		<div
			onClick={handleClose}
			className='fixed z-10 w-screen top-0 left-0 h-screen flex bg-black/30'>
			{selectStage()}
		</div>
	);
}

export default LaptopNavBar;
