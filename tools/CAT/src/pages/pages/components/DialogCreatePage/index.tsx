import { useState, useEffect } from 'react';
import Dialog from '@/components/Dialog';
import { Button } from '@chakra-ui/react';
import Edit from '@/components/Edit';
import SelectTemplates from '@/components/SelectTemplates';
import { useInitialPageState } from '@/initialStates/PageState';
import { addPage } from '@/app/features/pages/pageThunks';
import { useAppDispatch } from '@/app/hooks';

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
	const { pageDataState, setPageDataState } = useInitialPageState({
		subCategoryId,
	});

	const dispatch = useAppDispatch();

	const handleChangeTitlePage = ({ target }) => {
		let { value } = target;
		setPageDataState({ ...pageDataState, title: value });
	};

	const handleChangeUrlPage = ({ target }) => {
		let { value } = target;
		setPageDataState({ ...pageDataState, url: value });
	};

	const handleChangeTemplateType = (value) => {
		setPageDataState({
			...pageDataState,
			template: { ...pageDataState.template, type: value },
		});
	};

	const handleAdd = () => {
		const { title, url, subCategoryId, template, content, id } =
			pageDataState;
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
						selectedType={pageDataState.template.type}
					/>
				</div>
				<div className='w-fit mx-auto gap-8 flex'>
					<Button
						className='hover:bg-activeItems'
						onClick={handleAdd}>
						Створити
					</Button>
				</div>
			</div>
		</Dialog>
	);
}
