import { useState } from "react";
import Dialog from "@/components/Dialog";
import Button from "@/components/Button";
import { useAddCategoryMutation } from "@/store/apis/categories";
import Edit from "@/components/Edit";

interface CategoryState {
	title: string;
	url: string;
}
interface CategoryProps {
	handleClose: () => void;
	parentUrl: string;
}
export default function DialogCreateCategory({
	handleClose,
	parentUrl,
}: CategoryProps) {
	const [createCategory, setCreateCategory] = useState<CategoryState>({
		title: "",
		url: "",
	});
	const [addCategory] = useAddCategoryMutation();

	const handleChangeTitleCategory = ({ target }) => {
		setCreateCategory({ ...createCategory, title: target.value });
	};
	const handleChangeUrlCategory = ({ target }) => {
		setCreateCategory({ ...createCategory, url: target.value });
	};
	const handleClick = () => {
		addCategory(createCategory);
		handleClose();
	};

	return (
		<Dialog onClick={handleClose} className='h-72'>
			<div className='flex flex-col gap-3'>
				<Edit
					value=''
					name='Назва'
					type='text'
					onChange={handleChangeTitleCategory}
					withoutButtonSave={true}
				/>
				<div className='mt-6'>
					<Edit
						value=''
						name={parentUrl}
						type='link'
						onChange={handleChangeUrlCategory}
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
