import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsData } from '../../../../app/features/news/newsThunks';
import {
	getNewsDataSelector,
	getNewsLoadingSelector,
} from '../../../../app/features/news/newsSlice';
import SpinnerWrapper from '../../../../components/SpinnerWrapper';
import { formatUkrainianDateTime } from '../../../../helpers/date';
export default function NewsMainPage() {
	const dispatch = useDispatch();
	const newsData = useSelector(getNewsDataSelector);
	const isLoading = useSelector(getNewsLoadingSelector);

	const truncate = (text) => {
		return text.substring(0, 100) + '...';
	};

	useEffect(() => {
		dispatch(fetchNewsData({ pageNumber: 1, pageSize: 4, searchTerm: '' }));
	}, []);

	return (
		<div className='h-[600px] flex w-full mt-5'>
			{isLoading ? (
				<SpinnerWrapper />
			) : (
				<div className='w-4/5 mx-auto'>
					<div className='w-full flex'>
						<span className='text-colorTextColor text-4xl mr-3 font-medium'>
							Новини
						</span>
						<div className='h-[2px] bg-backgroundBorder rounded-2xl w-full my-auto'></div>
					</div>
					<div className='w-full'>
						<NavLink to='/all-data'>
							<p className='text-accentTextColor text-xl mt-3 underline'>
								Всі новини
							</p>
						</NavLink>
					</div>
					<div className='w-full h-full flex mt-3'>
						<div className='w-1/2 h-full flex justify-between'>
							<div className='w-9/12 h-full'>
								<div className='w-full h-3/6 rounded-2xl overflow-hidden border'>
									<img
										src={newsData.data[0].image.url}
										alt=''
										className='w-full h-full object-cover'
									/>
								</div>
								<div className=''>
									<h3 className='tracking-widest text-colorTextColor italic font-black text-lg truncate w-full'>
										{newsData.data[0].title}
									</h3>
									<p className='text-colorTextColor font-semibold text-justify mt-2 text-md'>
										{truncate(newsData.data[0].description)}
										<NavLink to='/'>
											<span className='ml-2 text-accentTextColor hover:underline'>
												Детальніше
											</span>
										</NavLink>
									</p>
									<p className='text-sm mt-2 text-[#999999]'>
										{formatUkrainianDateTime(
											newsData.data[0].date
										)}
									</p>
								</div>
							</div>
						</div>
						<div className='w-1/2 h-full flex flex-col gap-5'>
							{newsData.data.map(
								(item, index) =>
									index > 0 && (
										<div
											className='w-full h-[130px] flex gap-3'
											key={item.id}>
											<div className='w-4/12 h-full rounded-2xl overflow-hidden border'>
												<img
													src={item.image}
													alt=''
													className='w-full h-full object-cover'
												/>
											</div>
											<div className='w-8/12'>
												<h3 className='tracking-widest text-colorTextColor italic font-black text-lg  truncate w-full'>
													{item.title}
												</h3>
												<p className='text-colorTextColor w-full overflow-hidden font-medium text-justify mt-2 text-base'>
													{truncate(item.description)}
													<NavLink to='/'>
														<span className='ml-2 text-accentTextColor hover:underline'>
															Детальніше
														</span>
													</NavLink>
												</p>
												<p className='text-sm mt-2 text-[#999999]'>
													{formatUkrainianDateTime(
														item.date
													)}
												</p>
											</div>
										</div>
									)
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
