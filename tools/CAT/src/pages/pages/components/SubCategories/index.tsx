import { Card } from '@chakra-ui/react';
import { defaultUrl } from '@/utils/defaultUrl';
import Edit from '@/components/Edit';
import DeleteButton from '@/components/DeleteButton';
import { SubCategoryDto } from '@/models/api';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
	updateSubCategory,
	deleteSubCategory,
} from '@/app/features/subCategories/subCategoriesThunks';
import List from '../List';
import { Formik, ErrorMessage, Form } from 'formik';
import { updateSubCategoriesSchema } from '@/validation/update.subCategory.schema';
import { getСategoryDataSelector } from '@/app/features/categories/categorySlice';

interface SubCategoryState {
	subCategoryId: string;
	title: string;
	url: string;
}

export default function SubCategories({
	title,
	url,
	pages,
	id,
	parentUrl,
	categoryId,
}: SubCategoryDto & { parentUrl: string } & { categoryId: string }) {
	const categoriesData = useAppSelector(getСategoryDataSelector);
	const dispatch = useAppDispatch();
	const initialSubCategory: SubCategoryState = {
		subCategoryId: id,
		title: title,
		url: url,
	};

	const handleUpdate = (values: SubCategoryState) => {
		dispatch(updateSubCategory(values));
	};

	const handleDelete = () => {
		dispatch(deleteSubCategory(id));
	};

	return (
		<Card className='h-full w-full p-3'>
			<div className='w-full flex items-center justify-between mb-5'>
				<Formik
					initialValues={initialSubCategory}
					validationSchema={updateSubCategoriesSchema(
						categoriesData,
						categoryId,
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
										nameInput={`${defaultUrl}${parentUrl}/`}
										name='url'
										type='link'
										withoutButtonSave={false}
										formValues={values}
										disabled={isValid}
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
				<DeleteButton
					className='mr-auto ml-2 mb-auto ml-auto'
					onClick={handleDelete}
				/>
			</div>
			<List
				pages={pages}
				subCategoryId={initialSubCategory.subCategoryId}
				parentUrl={`${defaultUrl}${parentUrl}/${initialSubCategory.url}/`}
			/>
		</Card>
	);
}
