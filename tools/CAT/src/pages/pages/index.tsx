import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import DialogCreateCategory from './components/DialogCreateCategory';
import { useEffect, useState } from 'react';
import { defaultUrl } from '@/utils/defaultUrl';
import AddButton from '@/components/AddButton';
import { CategoryDto } from '@/models/api';
import SpinnerWrapper from '@/components/Spinner';
import {
	getСategoryData,
	getСategoryLoading,
} from '@/app/features/categories/categorySlice';
import { fetchCategoriesData } from '@/app/features/categories/categoryThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Category from './components/Category';

const Pages = () => {
	const [isOpenPopupForCategoties, setIsOpenPopupForCategoties] =
		useState<boolean>(false);
	const dispatch = useAppDispatch();
	const categories = useAppSelector(getСategoryData);
	const isLoading = useAppSelector(getСategoryLoading);

	useEffect(() => {
		dispatch(fetchCategoriesData());
	}, []);

	const handleClickOnAddButton = () => {
		setIsOpenPopupForCategoties(true);
	};
	const handleClosePopupCategoties = () => {
		setIsOpenPopupForCategoties(false);
	};

	return (
		<div className='h-full w-full'>
			{!isLoading ? (
				<Tabs isFitted>
					<TabList>
						{(categories as CategoryDto[])?.map(
							({ title, id }: CategoryDto) => (
								<Tab key={id}>{title}</Tab>
							)
						)}
						<AddButton
							className='text-md h-full'
							onClick={handleClickOnAddButton}>
							Нова категорія
						</AddButton>
					</TabList>
					<TabPanels>
						{(categories as CategoryDto[])?.map(
							({
								title,
								subCategories,
								id,
								url,
							}: CategoryDto) => (
								<TabPanel key={id}>
									<Category
										title={title}
										id={id}
										url={url}
										subCategories={subCategories}
									/>
								</TabPanel>
							)
						)}
					</TabPanels>
				</Tabs>
			) : (
				<SpinnerWrapper />
			)}

			{isOpenPopupForCategoties && (
				<DialogCreateCategory
					handleClose={handleClosePopupCategoties}
					parentUrl={defaultUrl}
				/>
			)}
		</div>
	);
};

export default Pages;
