import { useState, useEffect } from 'react';
import { defaultUrl } from '@/utils/defaultUrl';
import SubCategories from '../SubCategories';
import AddButton from '../../../../components/AddButton';
import Edit from '@/components/Edit';
import DeleteButton from '@/components/DeleteButton';
import DialogCreateSubCategories from '../DialogCreateSubcategories';
import { CategoryDto } from '@/models/api';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
	deleteCategory,
	updateCategory,
} from '@/app/features/categories/categoryThunks';
import {
	getСategoryDataSelector,
	getCategoryErrorSelector,
} from '@/app/features/categories/categorySlice';
import { Formik, ErrorMessage, Form } from 'formik';
import { updateCategoriesSchema } from '@/validation/update.category.schema';
import { showErrorNotif } from '@/providers/notify';
import { Button } from '@chakra-ui/react';
import { convertCategoryDataToPositionNavMenuItemsModel } from '@/helpers/categoryDataTransformer';
import {
	activateIsUpdated,
	getPositionNavMenuItemsIsUpdatedSelector,
} from '@/app/features/positionNavMenuItems/positionNavMenuItemsSlice';
interface StatePage {
	categoryId: string;
	title: string;
	url: string;
}

export default function Category({
	title,
	subCategories,
	id,
	url,
}: CategoryDto) {
	const dispatch = useAppDispatch();
	const [urlForChild, setUrlForChild] = useState<string>(url);
	const error = useAppSelector(getCategoryErrorSelector);
	const isUpdatedPositionItems = useAppSelector(
		getPositionNavMenuItemsIsUpdatedSelector
	);
	const initialCategory: StatePage = {
		categoryId: id,
		title: title,
		url: url,
	};

	const categoriesData = useAppSelector(getСategoryDataSelector);
	const [isOpenPopupForSubCategoties, setIsOpenPopupForSubCategoties] =
		useState<boolean>(false);

	useEffect(() => {
		if (error) {
			showErrorNotif(error);
		}
	}, [error]);

	const handleClosePopupSubCategoties = () => {
		setIsOpenPopupForSubCategoties(false);
	};

	const handleOpenPopupSubCategoties = () => {
		setIsOpenPopupForSubCategoties(true);
	};

	const handleUpdate = (values: StatePage) => {
		dispatch(updateCategory(values));
	};

	const handleDelete = () => {
		dispatch(deleteCategory(id));
	};
	const updatedPositionItems = () => {
		dispatch(activateIsUpdated());
		convertCategoryDataToPositionNavMenuItemsModel(categoriesData);
	};
	return (
		<div className='w-full flex flex-col h-[82vh]'>
			<div className='flex w-11/12 mx-auto mb-10'>
				<Formik
					initialValues={initialCategory}
					validationSchema={updateCategoriesSchema(
						categoriesData,
						id
					)}
					onSubmit={handleUpdate}>
					{({ isValid, values, setFieldValue }) => (
						<Form>
							<div className='flex flex-col'>
								<div className=''>
									<Edit
										value={title}
										id='title'
										name='title'
										nameInput='Назва'
										type='text'
										withoutButtonSave={false}
										disabled={isValid}
										formValues={values}
									/>
									<ErrorMessage
										className='text-red mb-2 text-xs'
										name='title'
										component='span'
									/>
								</div>
								<div className='mt-6'>
									<Edit
										value={url}
										id='url'
										nameInput={defaultUrl}
										name='url'
										type='link'
										withoutButtonSave={false}
										disabled={isValid}
										formValues={values}
									/>
									<ErrorMessage
										className='text-red mb-2 text-xs'
										name='url'
										component='span'
									/>
								</div>
							</div>
						</Form>
					)}
				</Formik>
				<Button
					type='submit'
					colorScheme='green'
					onClick={updatedPositionItems}
					className={`w-fit px-10 py-4 mr-5 ml-auto ${
						!isUpdatedPositionItems && 'animate-pulse'
					}`}>
					Оновити переміщення
				</Button>
				<DeleteButton onClick={handleDelete} className='mr-0'>
					Видалити
				</DeleteButton>
			</div>
			<div className='grid grid-cols-2 gap-10 w-11/12 h-5/6 mx-auto overflow-y-auto overflow-hidden place-items-center py-3 px-2'>
				{subCategories?.map(({ title, pages, id, url }, index) => (
					<SubCategories
						url={url}
						pages={pages}
						index={index}
						title={title}
						id={id}
						categoryId={initialCategory.categoryId}
						parentUrl={urlForChild}
						key={id}
						subCategoryLength={subCategories?.length}
					/>
				))}
				<AddButton
					onClick={handleOpenPopupSubCategoties}
					children='Додати підкатегорію'
				/>
			</div>
			{isOpenPopupForSubCategoties && (
				<DialogCreateSubCategories
					categoryId={id}
					handleClose={handleClosePopupSubCategoties}
					parentUrl={`${defaultUrl}${urlForChild}/`}
				/>
			)}
		</div>
	);
}
