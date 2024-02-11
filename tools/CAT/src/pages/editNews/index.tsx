import { useEffect, useState } from 'react';
import { Formik, ErrorMessage, Form } from 'formik';
import { NewsDto } from '@/models/api';
import { updateNewsSchema } from '@/validation/update.news.schema';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import DeleteButton from '@/components/DeleteButton';
import Edit from '@/components/Edit';
import { useParams } from 'react-router-dom';
import { apiClient } from '@/app/apiClient';
import { getErrorMessage } from '@/factories/errorMessage.factory';
import { showErrorNotif } from '@/providers/notify';
import { formatUkrainianDateTime } from '@/helpers/date';
import EditTextArea from '@/components/EditTextArea';
import UploadFileWrapper from '@/components/UploadFileWrapper';
import DatePicker from '@/components/DatePicker';
import PinRadioToggle from '@/components/PinRadioToggle';
import EditorWrapper from '@/components/EditorWrapper';
import SpinnerWrapper from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { updateNews } from '@/app/features/news/newsThunks';
import { useNavigate } from 'react-router-dom';
import EditTitlePage from '@/components/EditTitlePage';
import { fetchNewsData } from '@/app/features/news/newsThunks';
import { paginationSettings } from '@/utils/pagination';

function EditNews() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [initialNews, setInitialNews] = useState<NewsDto>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			try {
				const responce = await apiClient.get(`api/News/${id}`);
				const { data } = responce;
				setInitialNews(data);
			} catch (error) {
				const { data } = error.responce;
				showErrorNotif(getErrorMessage(data));
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const handleSubmit = (values: NewsDto) => {
		navigate('/news');
		dispatch(updateNews(values)).then(() => {
			dispatch(
				fetchNewsData({
					...paginationSettings,
					searchTerm: '',
				})
			);
		});
	};

	return (
		<div className='w-full h-full overflow-y-auto flex flex-col'>
			{isLoading ? (
				<div className='h-screen w-full'>
					<SpinnerWrapper />
				</div>
			) : (
				<Formik
					initialValues={initialNews}
					validationSchema={updateNewsSchema(null)}
					onSubmit={handleSubmit}>
					{({ values, isValid }) => (
						<Form>
							<div className='flex w-full flex-col pt-5'>
								<div className='w-11/12 mx-auto mb-5'>
									<div className='justify-between flex'>
										<Link to='/news'>
											<Button>
												<i className='fa-solid fa-left-long mr-2'></i>
												Назад
											</Button>
										</Link>
										<div>
											<Button
												type='submit'
												disabled={!isValid}
												colorScheme='green'
												className='w-fit px-10 py-4 mr-5'>
												Оновити
											</Button>
											<DeleteButton>
												Видалити
											</DeleteButton>
										</div>
									</div>
									<div className='w-full flex'>
										<div className='w-6/12 mt-5 flex flex-col gap-4'>
											<div className=''>
												<Edit
													value=''
													id='title'
													name='title'
													nameInput='Заголовок'
													type='text'
													withoutButtonSave={true}
													placeholder='Введіть текст'
												/>
												<ErrorMessage
													className='text-red mb-2 text-xs'
													name='title'
													component='span'
												/>
											</div>
											<div>
												<EditTextArea
													id='description'
													name='description'
													nameInput='Короткий опис'
													placeholder='Введіть текст'
												/>
												<ErrorMessage
													className='text-red mb-4 text-xs'
													name='description'
													component='span'
												/>
											</div>
											<div className='mt-3'>
												<UploadFileWrapper
													name='image.url'
													nameInput='Виберіть зображення'
													value={values.image.url}
												/>
												<ErrorMessage
													className='text-red mb-2 text-xs'
													name='image.url'
													component='span'
												/>
											</div>
											<div className='flex'>
												<div className=''>
													<PinRadioToggle
														value={values.pinned}
														name='pinned'
													/>
													<DatePicker
														date={values.date}
														name='date'
													/>
													<ErrorMessage
														className='text-red mb-2 text-xs'
														name='date'
														component='span'
													/>
												</div>
											</div>
										</div>
										<div className='w-6/12 mt-5 flex'>
											<div className='mx-auto w-9/12 h-96 gap-3'>
												<div className='w-full h-3/6 rounded-2xl overflow-hidden border'>
													<img
														src={values.image.url}
														alt=''
														className='w-full h-full object-cover'
													/>
												</div>
												<div className=''>
													<h3 className='tracking-widest text-colorTextColor italic font-black text-lg truncate w-full'>
														{values.title}
													</h3>
													<p className='text-colorTextColor font-semibold text-justify mt-2 text-md'>
														{values.description}
													</p>
													<p className='text-sm mt-2 text-[#999999]'>
														{formatUkrainianDateTime(
															values.date
														)}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<EditTitlePage
									url={values.titleBackgroundImage.url ?? ''}
									label={values.title ?? ''}
									nameUrl={'titleBackgroundImage.url'}
									nameLabel={'title'}
								/>
								<EditorWrapper
									name='content'
									content={values.content}
								/>
							</div>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
}

export default EditNews;
