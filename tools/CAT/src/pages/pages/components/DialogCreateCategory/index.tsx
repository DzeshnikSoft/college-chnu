import { useState } from 'react';
import Dialog from '@/components/Dialog';
import Edit from '@/components/Edit';
import { addCategory } from '@/app/features/categories/categoryThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Formik, ErrorMessage, Form } from 'formik';
import { createCategoriesSchema } from '@/validation/create.category.schema';
import { Button } from '@chakra-ui/react';
import { getСategoryData } from '@/app/features/categories/categorySlice';
interface CategoryState {
	title: string;
	url: string;
}
interface CategoryProps {
	handleClose: () => void;
	parentUrl: string;
}
export default function DialogCreateCategory({
	handleClose,
	parentUrl,
}: CategoryProps) {
	const categoriesData = useAppSelector(getСategoryData);
	const initialCategory: CategoryState = {
		title: '',
		url: '',
	};
	const dispatch = useAppDispatch();

	const handleClick = (values: CategoryState) => {
		dispatch(addCategory(values));
		handleClose();
	};

	return (
		<Dialog onClick={handleClose} className='h-72'>
			<Formik
				initialValues={initialCategory}
				validationSchema={createCategoriesSchema(categoriesData)}
				onSubmit={handleClick}>
				{(formik) => (
					<Form>
						<div className='flex flex-col gap-3'>
							<Edit
								value=''
								id='title'
								name='title'
								nameInput='Назва категорії'
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
