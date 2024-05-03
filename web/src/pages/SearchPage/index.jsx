import { useState, useCallback } from 'react';
import { debounce } from 'lodash';

import TitlePage from '../DynamicPage/components/PageWithTitleWrapper/TitlePage';
import Search from '../../components/Search';
import SearchWrapper from './components/SearchWrapper';
import { apiClient } from '../../app/apiClient';
import SpinnerWrapper from '../../components/SpinnerWrapper';
import NotFoundData from '../../components/NotFoundData';

function SearchPage() {
	const [pagesData, setPagesData] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [textError, setTextError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const search = useCallback(({ target }) => {
		debounceSearch(target.value);
		setSearchText(target.value);
	}, []);

	const searchPages = async (searchTerm) => {
		try {
			setIsLoading(true);
			const responce = await apiClient.get(
				`api/Page/search/?SearchTerm=${searchTerm}`
			);
			const { data } = responce;
			setPagesData(data);
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	const debounceSearch = debounce((value) => {
		if (value.trim().length === 0) {
			setPagesData(null);
			setTextError('');
		}
		if (value.trim().length !== 0 && value.trim().length <= 3) {
			setPagesData(null);
			setTextError('Введіть більше 3 символів');
		}
		if (value.trim().length !== 0 && value.trim().length > 3) {
			searchPages(value);
			setTextError('');
		}
	}, 2000);

	return (
		<div className='flex flex-col w-full flex-1'>
			<TitlePage url='search-background.jpg'>Пошук</TitlePage>
			<div className='w-10/12 mx-auto flex flex-col flex-1 min-h-[300px]'>
				<div className='flex flex-col'>
					<Search
						onChange={search}
						value={searchText}
						placeholder='Введіть дані для пошуку'
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
				) : pagesData && pagesData?.data?.length !== 0 ? (
					<div className='flex flex-col'>
						<SearchWrapper
							title='Результат пошуку по сторінках'
							searhData={pagesData?.data}
						/>
					</div>
				) : (
					<div className='w-full h-5/6 flex items-center justify-center flex-1'>
						<NotFoundData />
					</div>
				)}
			</div>
		</div>
	);
}

export default SearchPage;
