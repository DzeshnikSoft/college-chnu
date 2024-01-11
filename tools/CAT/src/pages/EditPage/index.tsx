import { useEffect } from 'react';
import EditPageDefault from './editPageDefault';
import EditPageWithTitle from './editPageWithTitle';
import Edit from '@/components/Edit';
import { Link } from 'react-router-dom';
import UploadFileWrapper from '@/components/UploadFileWrapper';
import SpinnerWrapper from '@/components/Spinner';
import { Button } from '@chakra-ui/react';
import DeleteButton from '@/components/DeleteButton';
import { useInitialPageState } from '@/initialStates/PageState';
import { useParams } from 'react-router-dom';
import { deletePage, updatePage } from '@/app/features/pages/pageThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getPageData, getPageLoading } from '@/app/features/pages/pageSlice';
import { fetchPageByPath } from '@/app/features/pages/pageThunks';
import { useNavigate } from 'react-router-dom';

export default function EditPage() {
	const { category, subcategory, page } = useParams();
	const viewUrl = `${
		import.meta.env.VITE_API_URL
	}/${category}/${subcategory}`;

	const dispatch = useAppDispatch();
	const pageData = useAppSelector(getPageData);
	const isLoading = useAppSelector(getPageLoading);
	const { pageDataState, setPageDataState } = useInitialPageState({});
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(
			fetchPageByPath(
				`${category ? `${category}/` : ''}${
					subcategory ? `${subcategory}/` : ''
				}${page ?? ''}`
			)
		);
	}, []);

	useEffect(() => {
		setPageDataState({ ...pageData });
	}, [pageData]);

	const handleChangeTitle = ({ target }) => {
		const { value } = target;
		setPageDataState({ ...pageDataState, title: value });
	};

	const handleChangeUrlPage = ({ target }) => {
		const { value } = target;
		setPageDataState({ ...pageDataState, url: value });
	};

	const handleChangeContent = (value) => {
		setPageDataState({ ...pageDataState, content: value });
	};

	const handleChangeTemplateData = ({ url, label }) => {
		setPageDataState({
			...pageDataState,
			template: {
				...pageDataState.template,
				label: label,
				image: { ...pageDataState.template.image, url: url },
			},
		});
	};

	const handleDelete = () => {
		navigate('/pages');
		dispatch(deletePage(pageDataState.id));
	};
	const handleUpdate = () => {
		dispatch(updatePage(pageDataState));
	};

	const selectTemplate = (data) => {
		if (data) {
			switch (data.template.type) {
				case 0:
					return (
						<EditPageDefault
							handleChangeContent={handleChangeContent}
							content={data?.content}
						/>
					);
				case 1:
					return (
						<EditPageWithTitle
							handleChangeContent={handleChangeContent}
							handleChangeTemplateData={handleChangeTemplateData}
							content={data?.content}
							img={data?.template?.image?.url}
							title={data?.template?.label}
						/>
					);
				default:
					return <></>;
			}
		}
	};

	return (
		<div className='w-full h-full overflow-y-auto flex-col !p-0 rounded-none'>
			{isLoading ? (
				<SpinnerWrapper />
			) : (
				<>
					<div className='flex flex-col'>
						<div className='flex mt-3'>
							<div className='flex justify-between w-full'>
								<Link to='/pages'>
									<Button className='mx-4'>
										<i className='fa-solid fa-left-long mr-2'></i>
										Назад
									</Button>
								</Link>
							</div>
							<div className=''>
								<DeleteButton
									onClick={handleDelete}
									className='mx-4'>
									Видалити
								</DeleteButton>
							</div>
						</div>
						<div className='flex flex-col ml-10 gap-5 my-5'>
							<div className='w-8/12'>
								<Edit
									value={
										(pageDataState as { title: string })
											?.title ?? pageData?.title
									}
									name='Назва'
									type='text'
									onChange={handleChangeTitle}
									withoutButtonSave={true}
								/>
							</div>
							<div className='w-8/12'>
								<Edit
									value={
										(pageDataState as { url: string })
											?.url ?? pageData?.url
									}
									name={viewUrl}
									type='link'
									onChange={handleChangeUrlPage}
									withoutButtonSave={true}
								/>
							</div>
						</div>
						<div className='ml-10 my-5 flex'>
							<UploadFileWrapper />
						</div>
					</div>
					<div className='w-full mx-auto'>
						{selectTemplate(pageData)}
					</div>

					<Button
						onClick={handleUpdate}
						className='w-fit px-10 py-4 my-10 mx-auto'>
						Оновити дані
					</Button>
				</>
			)}
		</div>
	);
}
