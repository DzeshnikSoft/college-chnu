import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import DialogCreateCategory from './components/DialogCreateCategory';
import { useEffect, useState } from 'react';
import { defaultUrl } from '@/utils/defaultUrl';
import AddButton from '@/components/AddButton';
import { CategoryDto } from '@/models/api';
import SpinnerWrapper from '@/components/Spinner';
import {
	getСategoryDataSelector,
	getСategoryLoadingSelector,
	moveCategory,
} from '@/app/features/categories/categorySlice';
import { fetchCategoriesData } from '@/app/features/categories/categoryThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Category from './components/Category';
import ButtonArrow from '@/components/ButtonArrow';

const Pages = () => {
	const [isOpenPopupForCategoties, setIsOpenPopupForCategoties] =
		useState<boolean>(false);
	const dispatch = useAppDispatch();
	const categories = useAppSelector(getСategoryDataSelector);
	const isLoading = useAppSelector(getСategoryLoadingSelector);

	useEffect(() => {
		dispatch(fetchCategoriesData());
	}, []);

	const handleClickOnAddButton = () => {
		setIsOpenPopupForCategoties(true);
	};

	const handleClosePopupCategoties = () => {
		setIsOpenPopupForCategoties(false);
	};

	const rightButtonClick = (e, currentIndex) => {
		e.preventDefault();
		e.stopPropagation();
		const nextItemIndex = currentIndex + 1;
		dispatch(moveCategory({ currentIndex, newIndex: nextItemIndex }));
	};

	const leftButtonClick = (e, currentIndex) => {
		e.preventDefault();
		e.stopPropagation();
		const prevItemIndex = currentIndex - 1;
		dispatch(moveCategory({ currentIndex, newIndex: prevItemIndex }));
	};

	return (
		<div className='h-full w-full'>
			{!isLoading ? (
				<Tabs isFitted>
					<TabList>
						{(categories as CategoryDto[])?.map(
							({ title, id }: CategoryDto, index) => (
								<Tab className='relative' key={id}>
									{title}

									{categories.length !== 1 &&
										index !== categories?.length - 1 && (
											<ButtonArrow
												type='right'
												onClick={(e) =>
													rightButtonClick(e, index)
												}
												className='!absolute  right-3 !text-sm !h-5/6 w-6'
											/>
										)}

									{categories.length !== 1 && index !== 0 && (
										<ButtonArrow
											className='!absolute left-3 !text-sm !h-5/6 w-6'
											onClick={(e) =>
												leftButtonClick(e, index)
											}
											type='left'
										/>
									)}
								</Tab>
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
