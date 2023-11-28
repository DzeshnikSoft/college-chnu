import EditPageDefault from './EditPageDefault';
import EditPageWithTitle from './EditPageWithTitle';
import Edit from '@/components/Edit';
import Dialog from '@/components/Dialog';
import UploadFileWrapper from '@/components/UploadFileWrapper';
import SpinnerWrapper from '@/components/Spinner';
import { Button } from '@chakra-ui/react';
import { useUpdatePageMutation } from '@/store/apis/categories';
import { useGetPageQuery } from '@/store/apis/categories';
import DeleteButton from '@/components/DeleteButton';
import { useDeletePageMutation } from '@/store/apis/categories';
import { useInitialPageState } from '@/initialStates/PageState';

interface EditPageProps {
	handleClose: () => void;
	parentUrl: string;
	id: string;
	subCategoryId: string;
}

export default function EditPage({
	handleClose,
	parentUrl,
	id,
	subCategoryId,
}: EditPageProps) {
	const { pageData, setPageData } = useInitialPageState();
	const [deletePage] = useDeletePageMutation();
	const { data, isFetching } = useGetPageQuery(id);

	const [updatePage] = useUpdatePageMutation();
	const handleChangeTitle = ({ target }) => {
		const { value } = target;
		setPageData({ ...pageData, title: value });
	};

	const handleChangeUrlPage = ({ target }) => {
		const { value } = target;
		setPageData({ ...pageData, url: value });
	};

	const handleChangeContent = (value) => {
		setPageData({ ...pageData, content: value });
	};

	const handleChangeTemplateData = ({ url, label }) => {
		setPageData({
			...pageData,
			template: {
				...pageData.template,
				label: label,
				image: { ...pageData.template.image, url: url },
			},
		});
	};

	const handleDelete = () => {
		deletePage(id);
	};
	const handleUpdate = () => {
		updatePage(pageData);
	};

	const selectTemplate = (data) => {
		console.log(data);
		if (data) {
			switch (data?.template?.type) {
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
		<Dialog
			onClick={handleClose}
			className='w-full h-full overflow-y-auto flex-col !p-0 rounded-none'
			withoutCloseButton={true}>
			{isFetching ? (
				<SpinnerWrapper />
			) : (
				<>
					<div className='flex flex-col'>
						<div className='flex mt-3'>
							<div className=''>
								<Button onClick={handleClose} className='mx-4'>
									<i className='fa-solid fa-left-long mr-2'></i>
									Назад
								</Button>
							</div>
							<div className='w-5/12 mx-10'>
								<Edit
									value={(data as { title: string })?.title}
									name='Назва'
									type='text'
									onChange={handleChangeTitle}
								/>
							</div>
							<div className='w-5/12'>
								<Edit
									value={(data as { url: string })?.url}
									name={parentUrl}
									type='link'
									onChange={handleChangeUrlPage}
								/>
							</div>
							<div className=''>
								<DeleteButton
									onClick={handleDelete}
									className='mx-4'>
									Видалити
								</DeleteButton>
							</div>
						</div>
						<div className='ml-10 my-5 flex'>
							<UploadFileWrapper />
						</div>
					</div>
					<div className='w-full mx-auto'>{selectTemplate(data)}</div>
					<Button onClick={handleUpdate}>Оновити дані</Button>
				</>
			)}
		</Dialog>
	);
}
