import { useState, useEffect } from 'react';
import Dialog from '@/components/Dialog';
import { Button } from '@chakra-ui/react';
import { useAddPageMutation } from '@/store/apis/categories';
import Edit from '@/components/Edit';
import SelectTemplates from '@/components/SelectTemplates';
import EditPage from '@/pages/EditPage';
import SpinnerWrapper from '@/components/Spinner';
import { useInitialPageState } from '@/initialStates/PageState';

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
	const { pageData, setPageData } = useInitialPageState({
		subCategoryId,
	});

	const [isOpenEditorPage, setIsOpenEditorPage] = useState<boolean>(false);

	const [addPage, { isLoading, data }] = useAddPageMutation();

	const handleChangeTitlePage = ({ target }) => {
		let { value } = target;
		setPageData({ ...pageData, title: value });
	};

	const handleChangeUrlPage = ({ target }) => {
		let { value } = target;
		setPageData({ ...pageData, url: value });
	};

	const handleCloseEditDialog = () => {
		setIsOpenEditorPage(false);
	};

	const handleChangeTemplateType = (value) => {
		setPageData({
			...pageData,
			template: { ...pageData.template, type: value },
		});
	};

	const handleAdd = () => {
		const { title, url, subCategoryId, template, content } = pageData;
		let body = {
			title: title,
			url: url,
			subCategoryId: subCategoryId,
			template: { ...template, type: template.type },
			content: content,
		};

		addPage(body);
	};

	const handleOpen = () => {
		setIsOpenEditorPage(true);
		handleAdd();
	};

	return (
		<Dialog onClick={handleClose} className='h-5/6 w-10/12 px-20'>
			{isLoading ? (
				<SpinnerWrapper />
			) : (
				<div className='w-full flex flex-col justify-between'>
					<div className='flex flex-col w-full gap-3'>
						<div className='w-10/12 mx-auto'>
							<Edit
								value=''
								name='Назва'
								type='text'
								onChange={handleChangeTitlePage}
								withoutButtonSave={true}
							/>
						</div>
						<div className='w-10/12 mx-auto'>
							<Edit
								value=''
								name={parentUrl}
								type='link'
								onChange={handleChangeUrlPage}
								withoutButtonSave={true}
							/>
						</div>
					</div>
					<div className='flex w-full flex-col h-fit'>
						<h3 className='text-2xl text-center my-8'>
							Оберіть шаблон сторінки
						</h3>
						<SelectTemplates
							handleChangeTemplateType={handleChangeTemplateType}
							selectedType={pageData.template.type}
						/>
					</div>
					<div className='w-fit mx-auto gap-8 flex'>
						<Button
							className='hover:bg-activeItems'
							onClick={handleOpen}>
							Створити
						</Button>
					</div>
				</div>
			)}
			{isOpenEditorPage && (
				<EditPage
					handleClose={handleCloseEditDialog}
					parentUrl={parentUrl}
					subCategoryId={subCategoryId}
					id={(data as { id: string })?.id}
				/>
			)}
		</Dialog>
	);
}
