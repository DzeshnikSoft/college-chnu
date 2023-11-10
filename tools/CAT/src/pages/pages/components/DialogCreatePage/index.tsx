import { useState } from "react";
import Dialog from "@/components/Dialog";
import Button from "@/components/Button";
import { useAddPageMutation } from "@/store/apis/categories";
import Edit from "@/components/Edit";

interface PageState {
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
		content: "",
	});
	const [addPage] = useAddPageMutation();

	const handleChangeTitlePage = ({ target }) => {
		setCreatePage({ ...createPage, title: target.value });
	};
	const handleChangeUrlPage = ({ target }) => {
		setCreatePage({ ...createPage, url: target.value });
	};
	const handleClick = () => {
		addPage(createPage);
		handleClose();
	};

	return (
		<Dialog onClick={handleClose} className='h-72'>
			<div className='flex flex-col gap-3'>
				<Edit
					value=''
					name='Назва'
					type='text'
					onChange={handleChangeTitlePage}
					withoutButtonSave={true}
				/>
				<div className='mt-6'>
					<Edit
						value=''
						name={parentUrl}
						type='link'
						onChange={handleChangeUrlPage}
						withoutButtonSave={true}
					/>
				</div>
				<Button onClick={handleClick} className='mx-auto'>
					Створити
				</Button>
			</div>
		</Dialog>
	);
}
