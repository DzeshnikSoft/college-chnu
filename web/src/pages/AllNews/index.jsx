import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';
import useMediaQuery from '../../hooks/useMediaQuery';

import TitlePage from '../DynamicPage/components/PageWithTitleWrapper/TitlePage';
import { fetchNewsData } from '../../app/features/news/newsThunks';
import {
	getNewsDataSelector,
	getNewsLoadingSelector,
} from '../../app/features/news/newsSlice';
import SpinnerWrapper from '../../components/SpinnerWrapper';
import Search from '../../components/Search';
import News from '../../components/News';

const PAGINATION_ITEM_STYLE =
	'h-10 w-10 rounded-md cursor-pointer duration-200 bg-accentTextColor hover:bg-[#196D4C] flex justify-center items-center';

function AllNews() {
	const dispatch = useDispatch();
	const isLoading = useSelector(getNewsLoadingSelector);
	const newsData = useSelector(getNewsDataSelector);
	const [pageSize, setPageSize] = useState(0);
	const [gridString, setGridString] = useState('');
	const isLaptopXl = useMediaQuery(
		'(min-width: 1500px) and (max-width: 2570px)'
	);
	const isLaptop = useMediaQuery(
		'(min-width: 1100px) and (max-width: 1500px)'
	);
	const isTablet = useMediaQuery(
		'(min-width: 600px) and (max-width: 1100px)'
	);
	const isPhone = useMediaQuery('(max-width: 600px)');
	const [selectedPageIndex, setSelectedPageIndex] = useState(0);
	const [searchText, setSearchText] = useState('');

	const handleSearch = useCallback(({ target }) => {
		handleDebounce(target.value);
		setSearchText(target.value);
	}, []);

	const handleDebounce = debounce((value) => {
		if (value.trim() !== 0) {
			dispatch(
				fetchNewsData({
					pageNumber: 1,
					pageSize: pageSize,
					searchTerm: value,
				})
			);
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
		}
		if (isLaptop) {
			setPageSize(9);
			setGridString('grid-cols-3');
		}
		if (isTablet) {
			setPageSize(6);
			setGridString('grid-cols-2');
		}
		if (isPhone) {
			setPageSize(4);
			setGridString('grid-cols-1');
		}
	}, [isLaptopXl, isLaptop, isTablet, isPhone]);

	useEffect(() => {
		if (pageSize !== 0)
			dispatch(
				fetchNewsData({
					pageNumber: 1,
					pageSize: pageSize,
					searchTerm: '',
				})
			);
	}, [pageSize]);

	return (
		<div className='w-full h-full flex flex-col'>
			<TitlePage url='images-news.jpeg'>Новини</TitlePage>
			<div className='flex flex-col w-full'>
				<div className='w-10/12 mx-auto flex flex-col'>
					<Search
						placeholder='Знайдіть новину'
						onChange={handleSearch}
						value={searchText}
					/>
					{isLoading ? (
						<div className='min-h-[50vh]'>
							<SpinnerWrapper />
						</div>
					) : (
						<div className='min-h-[50vh]'>
							{newsData.data.length === 0 ? (
								<div className='w-full h-5/6 flex items-center justify-center'>
									<p className='text-3xl text-colorTextColor lg:text-xl'>
										Нічого не знайдено
									</p>
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
