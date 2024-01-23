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

	return (
		<div className='w-full flex flex-col h-relativelyHeaderFullScreen overflow-y-auto'>
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
				<DeleteButton onClick={handleDelete} className='ml-auto mr-0'>
					Видалити
				</DeleteButton>
			</div>
			<div className='grid grid-cols-2 gap-10 w-11/12 mx-auto place-items-center'>
				{subCategories?.map(({ title, pages, id, url }) => (
					<SubCategories
						url={url}
						pages={pages}
						title={title}
						id={id}
						categoryId={initialCategory.categoryId}
						parentUrl={urlForChild}
						key={id}
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
