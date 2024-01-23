import { useEffect } from 'react';
import Dialog from '@/components/Dialog';
import { Button } from '@chakra-ui/react';
import Edit from '@/components/Edit';
import SelectTemplates from '@/components/SelectTemplates';
import { addPage } from '@/app/features/pages/pageThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { PageDto } from '@/models/api';
import { Formik, ErrorMessage, Form, Field, useFormikContext } from 'formik';
import { getСategoryDataSelector } from '@/app/features/categories/categorySlice';
import { createPageSchema } from '@/validation/create.page.schema';
import { initialPageState } from '@/initialStates/PageState';

interface PageProps {
	handleClose: () => void;
	parentUrl: string;
	subCategoryId: string;
}

export default function DialogCreatePage({
	handleClose,
	parentUrl,
	subCategoryId,
}: PageProps) {
	const dispatch = useAppDispatch();
	const categoriesData = useAppSelector(getСategoryDataSelector);

	const handleAdd = (values: PageDto) => {
		const { title, url, subCategoryId, template, content } = values;
		let body = {
			title: title,
			url: url,
			subCategoryId: subCategoryId,
			template: { ...template, type: template.type },
			content: content,
		};
		dispatch(addPage(body));
	};

	return (
		<Dialog onClick={handleClose} className='h-5/6 w-10/12 px-20'>
			<Formik
				initialValues={initialPageState}
				validationSchema={createPageSchema(
					categoriesData,
					subCategoryId
				)}
				onSubmit={handleAdd}>
				{(formik) => (
					<Form>
						<SetSubcategoryId subCategoryId={subCategoryId} />
						<div className='w-full flex flex-col justify-between'>
							<div className='flex flex-col w-full gap-3'>
								<div className='w-10/12 mx-auto'>
									<Edit
										value=''
										id='title'
										name='title'
										nameInput='Назва сторінки'
										type='text'
										withoutButtonSave={true}
									/>
									<ErrorMessage
										className='text-red mb-2 text-xs'
										name='title'
										component='span'
									/>
								</div>
								<div className='w-10/12 mx-auto'>
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
							</div>
							<div className='flex w-full flex-col h-fit'>
								<h3 className='text-2xl text-center my-8'>
									Оберіть шаблон сторінки
								</h3>
								<SelectTemplates
									selectedType={
										initialPageState.template.type
									}
								/>
								<Field
									id='typeTemplate'
									name='template.type'
									className='hidden'
									type='number'
								/>
								<ErrorMessage
									className='text-red mb-2 text-xs'
									name='template.type'
									component='span'
								/>
							</div>
							<div className='w-fit mx-auto gap-8 flex'>
								<Button
									className='text-xl rounded-sm bg-activeItems cursor-pointer p-2 mx-auto'
									type='submit'
									disabled={!formik.isValid}>
									Створити
								</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
}

const SetSubcategoryId = ({ subCategoryId }) => {
	const { setFieldValue } = useFormikContext();
	useEffect(() => {
		setFieldValue('subCategoryId', subCategoryId);
	}, []);
	return <></>;
};
