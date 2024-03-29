import { useEffect } from 'react';
import EditPageDefault from './EditPageDefault';
import EditPageWithTitle from './EditPageWithTitle';
import Edit from '@/components/Edit';
import { Link } from 'react-router-dom';
import SpinnerWrapper from '@/components/Spinner';
import { Button } from '@chakra-ui/react';
import DeleteButton from '@/components/DeleteButton';
import { useParams } from 'react-router-dom';
import {
	deletePage,
	updatePage,
	fetchPageByPath,
} from '@/app/features/pages/pageThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
	getPageDataSelector,
	getPageLoadingSelector,
	getPageErrorSelector,
} from '@/app/features/pages/pageSlice';
import { useNavigate } from 'react-router-dom';
import { PageDto } from '@/models/api';
import { Formik, ErrorMessage, Form } from 'formik';
import { updatePageSchema } from '@/validation/update.page.schema';
import {
	getСategoryDataSelector,
	getСategoryLoadingSelector,
} from '@/app/features/categories/categorySlice';
import { fetchCategoriesData } from '@/app/features/categories/categoryThunks';
import { showErrorNotif } from '@/providers/notify';

export default function EditPage() {
	const { category, subcategory, page } = useParams();
	const viewUrl = `${
		import.meta.env.VITE_API_URL
	}/${category}/${subcategory}`;

	const dispatch = useAppDispatch();
	const pageData = useAppSelector(getPageDataSelector);
	const isLoading = useAppSelector(getPageLoadingSelector);
	const errorPage = useAppSelector(getPageErrorSelector);
	const categoriesData = useAppSelector(getСategoryDataSelector);
	const categoriesLoading = useAppSelector(getСategoryLoadingSelector);

	const initialPage: PageDto = pageData;

	const navigate = useNavigate();

	useEffect(() => {
		if (categoriesData.length === 0) dispatch(fetchCategoriesData());
		dispatch(fetchPageByPath(`${category}/${subcategory}/${page}`));
	}, []);

	useEffect(() => {
		if (errorPage) {
			navigate('/pages');
			showErrorNotif(errorPage);
		}
	}, [errorPage]);

	const handleDelete = () => {
		navigate('/pages');
		dispatch(deletePage(pageData.id));
	};

	const handleUpdate = (values: PageDto) => {
		dispatch(updatePage(values));
		navigate(`/pages`);
	};

	const selectTemplate = (data) => {
		if (data) {
			switch (data.template.type) {
				case 0:
					return <EditPageDefault content={data.content} />;
				case 1:
					return (
						<EditPageWithTitle
							content={data.content}
							img={data.template.image.url}
							title={data.template.label}
						/>
					);
				default:
					return <></>;
			}
		}
	};

	return (
		<div className='w-full h-full overflow-y-auto flex-col !p-0 rounded-none'>
			{categoriesLoading || isLoading ? (
				<div className='h-screen w-full'>
					<SpinnerWrapper />
				</div>
			) : (
				<Formik
					initialValues={initialPage}
					validationSchema={updatePageSchema(
						categoriesData,
						pageData.subCategoryId,
						pageData.id
					)}
					onSubmit={handleUpdate}>
					{({ values, isValid }) => (
						<Form>
							<div className='flex flex-col'>
								<div className='flex mt-3'>
									<div className='flex justify-between w-full'>
										<Link to='/pages'>
											<Button className='mx-4'>
												<i className='fa-solid fa-left-long mr-2'></i>
												Назад
											</Button>
										</Link>
										<div className=''>
											<Button
												type='submit'
												disabled={!isValid}
												colorScheme='green'
												className='w-fit px-10 py-4'>
												Оновити дані
											</Button>

											<DeleteButton
												onClick={handleDelete}
												className='mx-4'>
												Видалити
											</DeleteButton>
										</div>
									</div>
								</div>
								<div className='flex flex-col ml-10 gap-5 my-5'>
									<div className='w-8/12'>
										<Edit
											value={values.title}
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
									<div className='w-8/12'>
										<Edit
											value={values.url}
											id='url'
											nameInput={viewUrl}
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
							</div>
							<div className='w-full mx-auto'>
								{selectTemplate(values)}
							</div>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
}
