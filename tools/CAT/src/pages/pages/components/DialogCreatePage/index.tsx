import { useState } from "react";
import Dialog from "@/components/Dialog";
import { Button } from "@chakra-ui/react";
import { useAddPageMutation } from "@/store/apis/categories";
import Edit from "@/components/Edit";
import SelectTemplates from "@/components/SelectTemplates";
import EditPage from "@/pages/EditPage";
interface PageState {
	title: string;
	url: string;
	content: string;
	template: Template;
	subCategoryId: string;
}
interface Template {
	type: string;
	image: string;
	title: string;
}
//temporary! until the api is done
interface PageTempState {
	title: string;
	url: string;
	content: string;
	subCategoryId: string;
}

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
	const [createPage, setCreatePage] = useState<PageState>({
		subCategoryId: subCategoryId,
		title: "",
		url: "",
		template: {
			type: "withTitle",
			image: "",
			title: "",
		},
		content: "",
	});

	const [createTempPage, setCreateTempPage] = useState<PageTempState>({
		subCategoryId: subCategoryId,
		title: "",
		url: "",
		content: "",
	});

	const [isOpenEditorPage, setIsOpenEditorPage] = useState<boolean>(false);

	const [addPage, { isLoading }] = useAddPageMutation();

	const handleChangeTitlePage = ({ target }) => {
		let { value } = target;
		setCreateTempPage({ ...createTempPage, title: value });
	};

	const handleChangeUrlPage = ({ target }) => {
		let { value } = target;
		setCreateTempPage({ ...createTempPage, url: value });
	};

	const handleCloseEditDialog = () => {
		setIsOpenEditorPage(false);
	};

	const handleChangeTemplateType = (value) => {
		setCreatePage({
			...createPage,
			template: { ...createPage.template, type: value },
		});
	};

	const handleAdd = () => {
		addPage(createTempPage);
	};

	const handleOpen = () => {
		setIsOpenEditorPage(true);
		handleAdd();
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
						selectedType={createPage.template.type}
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
			{isOpenEditorPage && (
				<EditPage
					handleClose={handleCloseEditDialog}
					parentUrl={parentUrl}
					templateType={createPage.template.type}
					loading={isLoading}
				/>
			)}
		</Dialog>
	);
}
