import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';

import TitlePage from '../DynamicPage/components/PageWithTitleWrapper/TitlePage';
import { fetchNewsData } from '../../app/features/news/newsThunks';
import {
	getNewsDataSelector,
	getNewsLoadingSelector,
} from '../../app/features/news/newsSlice';
import SpinnerWrapper from '../../components/SpinnerWrapper';
import Search from '../../components/Search';
import News from '../../components/News';
import useResponsive from '../../hooks/useResponce';
import NotFoundData from '../../components/NotFoundData';
const PAGINATION_ITEM_STYLE =
	'h-10 w-10 rounded-md cursor-pointer duration-200 bg-accentTextColor hover:bg-[#196D4C] flex justify-center items-center';

function AllNews() {
	const dispatch = useDispatch();
	const isLoading = useSelector(getNewsLoadingSelector);
	const newsData = useSelector(getNewsDataSelector);
	const [pageSize, setPageSize] = useState(0);
	const [gridString, setGridString] = useState('');
	const { isLaptopXl, isLaptop, isTablet, isMobile } = useResponsive();
	const [selectedPageIndex, setSelectedPageIndex] = useState(0);
	const [searchText, setSearchText] = useState('');
	const [textError, setTextError] = useState('');

	const handleSearch = useCallback(
		({ target }) => {
			handleDebounce(target.value);
			setSearchText(target.value);
		},
		[pageSize]
	);

	const handleDebounce = debounce((value) => {
		if (value.trim().length === 0) {
			setTextError('');
			console.log(pageSize);
			dispatch(
				fetchNewsData({
					pageNumber: 1,
					pageSize: pageSize,
					searchTerm: '',
				})
			);
		} else if (value.trim().length <= 3) {
			setTextError('Введіть більше 3 символів');
		} else {
			console.log(pageSize);
			dispatch(
				fetchNewsData({
					pageNumber: 1,
					pageSize: pageSize,
					searchTerm: value,
				})
			);
			setTextError('');
		}
	}, 2000);

	const handlePageChange = ({ selected }) => {
		setSelectedPageIndex(selected);
		dispatch(
			fetchNewsData({
				pageNumber: selected + 1,
				pageSize: pageSize,
				searchTerm: '',
			})
		);
	};

	useEffect(() => {
		if (isLaptopXl) {
			setPageSize(12);
			setGridString('grid-cols-4');
			setSearchText('');
			// console.log('laptopXL');
		}
		if (isLaptop) {
			// console.log('laptop');
			setPageSize(9);
			setGridString('grid-cols-3');
			setSearchText('');
		}
		if (isTablet) {
			// console.log('tablet');
			setPageSize(6);
			setGridString('grid-cols-2');
			setSearchText('');
		}
		if (isMobile) {
			// console.log('mobile');
			setPageSize(4);
			setGridString('grid-cols-1');
			setSearchText('');
		}
	}, [isLaptopXl, isLaptop, isTablet, isMobile]);

	useEffect(() => {
		if (pageSize !== 0)
			dispatch(
				fetchNewsData({
					pageNumber: 1,
					pageSize: pageSize,
					searchTerm: searchText,
				})
			);
		console.log(pageSize);
	}, [pageSize]);

	return (
		<div className='w-full flex flex-col flex-1'>
			<TitlePage url='images-news.jpeg'>Новини</TitlePage>
			<div className='flex flex-col w-full flex-1 min-h-[300px]'>
				<div className='w-10/12 mx-auto flex flex-col flex-1'>
					<div className='flex flex-col mb-5'>
						<Search
							placeholder='Знайдіть новину'
							onChange={handleSearch}
							value={searchText}
						/>
						{textError && (
							<p className='text-sm text-red-600 text-light'>
								{textError}
							</p>
						)}
					</div>
					{isLoading ? (
						<div className='h-full w-full m-auto'>
							<SpinnerWrapper />
						</div>
					) : (
						<div className='h-full w-full flex flex-1'>
							{newsData.data.length === 0 ? (
								<div className='w-full h-full flex items-center justify-center m-auto'>
									<NotFoundData />
								</div>
							) : (
								<div
									className={`grid w-full ${gridString} gap-10 mb-10`}>
									{newsData.data.map((item) => (
										<News
											description={item.description}
											title={item.title}
											key={item.id}
											image={item.image}
											url={item.url}
											date={item.date}
										/>
									))}
								</div>
							)}
						</div>
					)}

					{newsData && newsData.data.length > 0 && (
						<ReactPaginate
							breakLabel='...'
							pageCount={newsData.totalPages}
							pageRangeDisplayed={2}
							marginPagesDisplayed={1}
							onPageChange={handlePageChange}
							nextLabel='→'
							previousLabel='←'
							activeClassName='border-2 border-black'
							className='flex gap-5 mb-5 mx-auto'
							pageClassName={PAGINATION_ITEM_STYLE}
							breakLinkClassName='w-full h-full'
							nextClassName={`previous-next ${PAGINATION_ITEM_STYLE} ${
								selectedPageIndex === newsData.totalPages - 1
									? 'invisible pointer-events-none'
									: ''
							}`}
							previousClassName={`previous-next ${PAGINATION_ITEM_STYLE} ${
								selectedPageIndex === 0
									? 'invisible pointer-events-none'
									: ''
							}`}
							pageLinkClassName='border-none outline-none w-full h-full flex justify-center items-center'
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default AllNews;
