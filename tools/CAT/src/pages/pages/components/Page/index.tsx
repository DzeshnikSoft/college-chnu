import { useState, useEffect } from "react";
import { defaultUrl } from "@/utils/defaultUrl";
import SubCategories from "../SubCategories";
import AddButton from "../../../../components/AddButton";
import Edit from "@/components/Edit";
import DeleteButton from "@/components/DeleteButton";
import DialogCreateSubCategories from "../DialogCreateSubcategories";
import { CategoryDto } from "@/models/api";
import {
	useDeleteCategoryMutation,
	useUpdateCategoryMutation,
} from "@/store/apis/categories";

interface StatePage {
	categoryId: string;
	title: string;
	url: string;
}

export default function Page({ title, subCategories, id, url }: CategoryDto) {
	const [page, setPage] = useState<StatePage>({
		categoryId: id,
		title: title,
		url: url,
	});

	const [urlForChild, setUrlForChild] = useState<string>(url);

	const [isOpenPopupForSubCategoties, setIsOpenPopupForSubCategoties] =
		useState<boolean>(false);
	const [deleteCategory] = useDeleteCategoryMutation();
	const [updateCategory] = useUpdateCategoryMutation();

	const handleChangeTitle = ({ target }) => {
		setPage({ categoryId: id, url, title: target.value });
	};

	const handleChangeUrl = ({ target }) => {
		setPage({ categoryId: id, title, url: target.value });
	};

	const handleClosePopupSubCategoties = () => {
		setIsOpenPopupForSubCategoties(false);
	};

	const handleOpenPopupSubCategoties = () => {
		setIsOpenPopupForSubCategoties(true);
	};

	const handleUpdate = () => {
		updateCategory(page);
	};

	const handleDelete = () => {
		deleteCategory(id);
	};

	return (
		<div className='w-full flex flex-col h-full '>
			<div className='flex w-11/12 mx-auto mb-10'>
				<div className='flex flex-col'>
					<Edit
						value={page.title}
						name='Назва'
						type='text'
						onClick={handleUpdate}
						onChange={handleChangeTitle}
					/>
					<div className='mt-6'>
						<Edit
							value={page.url}
							name={defaultUrl}
							type='link'
							onClick={handleUpdate}
							onChange={handleChangeUrl}
						/>
					</div>
				</div>
				<DeleteButton onClick={handleDelete} className='ml-auto mr-0'>
					Видалити
				</DeleteButton>
			</div>
			<div className='grid grid-cols-2 gap-10 w-11/12 mx-auto place-items-center'>
				{subCategories.map(({ title, pages, id, url }) => (
					<SubCategories
						url={url}
						pages={pages}
						title={title}
						id={id}
						parentUrl={urlForChild}
					/>
				))}
				<AddButton
					onClick={handleOpenPopupSubCategoties}
					children='Додати підкатегорію'
				/>
			</div>
			{isOpenPopupForSubCategoties && (
				<DialogCreateSubCategories
					categoryId={id}
					handleClose={handleClosePopupSubCategoties}
					parentUrl={`${defaultUrl}${urlForChild}/`}
				/>
			)}
		</div>
	);
}
