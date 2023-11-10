import { useState } from "react";
import Dialog from "@/components/Dialog";
import Edit from "@/components/Edit";
import Button from "@/components/Button";
import { useAddSubCategoryMutation } from "@/store/apis/categories";

interface CategoryState {
	categoryId: string;
	title: string;
	url: string;
}

interface SubCategoryProps {
	categoryId: string;
	handleClose: () => void;
	parentUrl: string;
}
export default function DialogCreateSubCategories({
	categoryId,
	handleClose,
	parentUrl,
}: SubCategoryProps) {
	const [createSubCategory, setCreateSubCategory] = useState<CategoryState>({
		categoryId: categoryId,
		title: "",
		url: "",
	});
	const [addSubCategory] = useAddSubCategoryMutation();
	const handleChangeTitleSubCategory = ({ target }) => {
		setCreateSubCategory({ ...createSubCategory, title: target.value });
	};
	const handleChangeUrlSubCategory = ({ target }) => {
		setCreateSubCategory({ ...createSubCategory, url: target.value });
	};
	const handleClick = () => {
		addSubCategory(createSubCategory);
		handleClose();
	};

	return (
		<Dialog onClick={handleClose} className='w-80 h-72'>
			<div className='flex flex-col gap-3'>
				<Edit
					value=''
					name='Назва'
					type='text'
					onChange={handleChangeTitleSubCategory}
					withoutButtonSave={true}
				/>
				<div className='mt-6'>
					<Edit
						value=''
						name={parentUrl}
						type='link'
						onChange={handleChangeUrlSubCategory}
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
