import { useEffect, useState, useCallback } from 'react';
import AddButton from '@/components/AddButton';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import NewsCard from './components/NewsCard';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { fetchNewsData } from '@/app/features/news/newsThunks';
import {
	getNewsDataSelector,
	getNewsLoadingSelector,
	getNewsErrorSelector,
} from '@/app/features/news/newsSlice';
import SpinnerWrapper from '@/components/Spinner';
import { showErrorNotif } from '@/providers/notify';
import ReactPaginate from 'react-paginate';
import { PAGINATION_ITEM_STYLE } from '@/utils/repeat-styles';
import { throttle } from 'lodash';

const News = () => {
	const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
	const dispatch = useAppDispatch();
	const data = useAppSelector(getNewsDataSelector);
	const isNewsLoading = useAppSelector(getNewsLoadingSelector);
	const error = useAppSelector(getNewsErrorSelector);
	const [searchText, setSearchText] = useState<string>('');

	const handleSearch = useCallback(({ target }) => {
		handleThrottle(target.value);
		setSearchText(target.value);
	}, []);

	const handleThrottle = throttle((value) => {
		dispatch(
			fetchNewsData({ pageNumber: 1, pageSize: 4, searchTerm: value })
		);
	}, 1000);

	const handlePageChange = ({ selected }) => {
		setSelectedPageIndex(selected);
		dispatch(
			fetchNewsData({
				pageNumber: selected + 1,
				pageSize: 4,
				searchTerm: '',
			})
		);
	};

	useEffect(() => {
		dispatch(fetchNewsData({ pageNumber: 1, pageSize: 4, searchTerm: '' }));
	}, []);

	useEffect(() => {
		if (error) {
			showErrorNotif(error);
		}
	}, [error]);

	return (
		<div className='h-full w-full flex news-card'>
			<div className='w-11/12 h-full mx-auto flex flex-col'>
				<div className='w-full h-1/6 flex items-center justify-between'>
					<Link to='/create-news'>
						<AddButton className='mx-0'>Додати новину</AddButton>
					</Link>

					<div className='!w-5/12'>
						<InputGroup>
							<InputLeftElement>
								<SearchIcon />
							</InputLeftElement>
							<Input
								onChange={handleSearch}
								placeholder='Знайти новину'
								value={searchText}
							/>
						</InputGroup>
					</div>
				</div>
				<div className='h-5/6 flex flex-col justify-between'>
					{isNewsLoading ? (
						<SpinnerWrapper />
					) : (
						<>
							{data.data.length === 0 ? (
								<div className='w-full h-5/6 flex items-center justify-center'>
									<p className='text-3xl'>
										Нічого не знайдено
									</p>
								</div>
							) : (
								<div className='w-full h-5/6 grid grid-cols-2 gap-y-12 gap-x-5'>
									{data.data.map((item) => (
										<NewsCard
											image={item?.image?.url}
											key={item.id}
											id={item.id}
											title={item.title}
											description={item.description}
											date={item.date}
											pinned={item.pinned}
										/>
									))}
								</div>
							)}
						</>
					)}

					{data && data.data.length > 0 && (
						<ReactPaginate
							breakLabel='...'
							pageCount={data.totalPages}
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
								selectedPageIndex === data.totalPages - 1
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
};

export default News;
