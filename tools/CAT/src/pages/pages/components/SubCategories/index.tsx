import { useState } from "react";
import { Card } from "@chakra-ui/react";
import { defaultUrl } from "@/utils/defaultUrl";
import Edit from "@/components/Edit";
import DeleteButton from "@/components/DeleteButton";
import { SubCategoryDto } from "@/models/api";
import {
	useDeleteSubCategoryMutation,
	useUpdateSubCategoryMutation,
} from "@/store/apis/categories";
import List from "../List";

interface SubCategories {
	subCategoryId: string;
	title: string;
	url: string;
}
export default function SubCategories({
	title,
	url,
	pages,
	id,
	parentUrl,
}: SubCategoryDto & { parentUrl: string }) {
	const [subCategory, setSubCategory] = useState<SubCategories>({
		subCategoryId: id,
		title: title,
		url: url,
	});
	const [deleteSubCategory] = useDeleteSubCategoryMutation();
	const [updateSubCategory] = useUpdateSubCategoryMutation();

	const handleChangeTitle = ({ target }) => {
		setSubCategory({ subCategoryId: id, url, title: target.value });
	};

	const handleChangeUrl = ({ target }) => {
		setSubCategory({ subCategoryId: id, title, url: target.value });
	};
	const handleClick = () => {
		updateSubCategory(subCategory);
	};

	const handleDelete = () => {
		deleteSubCategory(id);
	};
	return (
		<Card className='h-full w-full p-3'>
			<div className='w-full flex items-center justify-between mb-5'>
				<div className='flex flex-col'>
					<Edit
						name='Назва підкатегорії'
						onChange={handleChangeTitle}
						onClick={handleClick}
						value={subCategory.title}
						type='text'
					/>
					<div className='mt-5'>
						<Edit
							value={subCategory.url}
							name={`${defaultUrl}${parentUrl}/`}
							onChange={handleChangeUrl}
							onClick={handleClick}
							type='link'
						/>
					</div>
				</div>
				<DeleteButton
					className='mr-auto ml-2 mb-auto ml-auto'
					onClick={handleDelete}
				/>
			</div>
			<List
				pages={pages}
				subCategoryId={subCategory.subCategoryId}
				parentUrl={`${defaultUrl}${parentUrl}/${subCategory.url}/`}
			/>
		</Card>
	);
}
