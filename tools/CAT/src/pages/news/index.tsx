import { useState } from 'react';
import AddButton from '@/components/AddButton';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { TEST_NEWS } from '@/utils/testNewsData';
import NewsCard from './components/NewsCard';

const News = () => {
	return (
		<div className='h-full w-full flex news-card'>
			<div className=''></div>
			<div className='w-11/12 h-full mx-auto flex flex-col'>
				<div className='w-full h-1/6 flex items-center justify-between'>
					<AddButton className='mx-0'>Додати новину</AddButton>
					<div className='!w-5/12'>
						<InputGroup>
							<InputLeftElement>
								<SearchIcon />
							</InputLeftElement>
							<Input placeholder='Знайти новину' />
						</InputGroup>
					</div>
				</div>
				<div className='w-full h-4/6 grid grid-cols-2 gap-y-12 gap-x-5'>
					{TEST_NEWS.map((item, index) => (
						<NewsCard
							image={item.image}
							key={index}
							description={item.description}
							date={item.date}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default News;
