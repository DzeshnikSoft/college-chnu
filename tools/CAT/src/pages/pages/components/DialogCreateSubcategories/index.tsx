import { useState } from 'react';
import Dialog from '@/components/Dialog';
import Edit from '@/components/Edit';
import { Button } from '@chakra-ui/react';
import { addSubCategory } from '@/app/features/subCategories/subCategoriesThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Formik, ErrorMessage, Form } from 'formik';
import { createSubCategoriesSchema } from '@/validation/create.subCategory.schema';
import { getСategoryDataSelector } from '@/app/features/categories/categorySlice';

interface SubCategoryState {
	categoryId: string;
	title: string;
	url: string;
}

interface SubCategoryProps {
	categoryId: string;
	handleClose: () => void;
	parentUrl: string;
}
export default function DialogCreateSubCategories({
	categoryId,
	handleClose,
	parentUrl,
}: SubCategoryProps) {
	const categoriesData = useAppSelector(getСategoryDataSelector);
	const dispatch = useAppDispatch();

	const initialSubCategory: SubCategoryState = {
		categoryId: categoryId,
		title: '',
		url: '',
	};

	const handleClick = (values: SubCategoryState) => {
		dispatch(addSubCategory(values));
		handleClose();
	};

	return (
		<Dialog onClick={handleClose} className='w-80 h-72'>
			<Formik
				initialValues={initialSubCategory}
				validationSchema={createSubCategoriesSchema(
					categoriesData,
					categoryId
				)}
				onSubmit={handleClick}>
				{(formik) => (
					<Form>
						<div className='flex flex-col gap-3'>
							<Edit
								value=''
								id='title'
								name='title'
								nameInput='Назва підкатегорії'
								type='text'
								withoutButtonSave={true}
							/>
							<ErrorMessage
								className='text-red mb-2 text-xs'
								name='title'
								component='span'
							/>
							<div className='mt-6'>
								<Edit
									value=''
									id='url'
									nameInput={parentUrl}
									name='url'
									type='link'
									withoutButtonSave={true}
								/>
								<ErrorMessage
									className='text-red mb-2 text-xs'
									name='url'
									component='span'
								/>
							</div>
							<Button
								className='text-xl rounded-sm bg-activeItems cursor-pointer p-2 mx-auto'
								type='submit'
								disabled={!formik.isValid}>
								Створити
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
}
