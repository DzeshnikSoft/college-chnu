import { useState } from "react";
import { useDispatch } from "react-redux";

import SubCategories from "../SubCategories";
import AddButton from "../../../../components/AddButton";
import CloseButton from "../../../../components/CloseButton";
import EditTitle from "@/components/Edit";

import { CategoryDto } from "@/models/api";
import { changeTitleCategory } from "@/store/features/admin.feature";
import {
	useDeleteCategoryMutation,
	useUpdateCategoryMutation,
} from "@/store/apis/categories";
interface PageState {
	categoryId: string;
	title: string;
	url: string;
}

export default function Page({ title, subCategories, id, url }: CategoryDto) {
	const [page, setPage] = useState<PageState>({
		categoryId: id,
		title: title,
		url: url,
	});
	const [deleteCategory] = useDeleteCategoryMutation();
	const [updateCategory] = useUpdateCategoryMutation();

	const handleChange = ({ target }) => {
		setPage({ categoryId: id, url, title: target.value });
	};
	const handleUpdate = () => {
		updateCategory(page);
	};
	const handleDelete = () => {
		deleteCategory(id);
	};
	return (
		<div className='w-full flex flex-col h-full '>
			<div className='w-full flex mb-10'>
				<div className='ml-24'>
					<EditTitle
						title={page.title}
						onClick={handleUpdate}
						onChange={handleChange}
					/>
				</div>
				<CloseButton onClick={handleDelete} className='ml-auto mr-20' />
			</div>
			<div className='grid grid-cols-3 gap-10 w-10/12 mx-auto place-items-center'>
				{subCategories.map(({ title, pages, id, url }) => (
					<SubCategories
						url={url}
						pages={pages}
						title={title}
						id={id}
					/>
				))}
				<AddButton />
			</div>
		</div>
	);
}
