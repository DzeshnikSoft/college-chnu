import { useEffect } from 'react';
import AddButton from '@/components/AddButton';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { TEST_NEWS } from '@/utils/testNewsData';
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

const News = () => {
	useEffect(() => {
		dispatch(fetchNewsData({ pageNumber: 1, pageSize: 4, SearchTerm: '' }));
	}, []);
	const dispatch = useAppDispatch();
	const newsData = useAppSelector(getNewsDataSelector);
	const isNewsLoading = useAppSelector(getNewsLoadingSelector);
	const error = useAppSelector(getNewsErrorSelector);

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
							<Input placeholder='Знайти новину' />
						</InputGroup>
					</div>
				</div>

				{isNewsLoading ? (
					<SpinnerWrapper />
				) : (
					<div className='h-5/6 flex flex-col justify-between'>
						<div className='w-full h-5/6 grid grid-cols-2 gap-y-12 gap-x-5'>
							{newsData.data.map((item) => (
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
						<div className='h-1/6'>Pagination...</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default News;
