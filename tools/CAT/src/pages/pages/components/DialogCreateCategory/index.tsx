import { useState, useEffect } from "react";
import Dialog from "@/components/Dialog";
import Button from "@/components/Button";
import { useAddCategoryMutation } from "@/store/api/categories";
import TextField from "@/components/TextField";

interface PropsCategory {
	title: string;
	url: string;
}

export default function DialogCreateCategory({ handleClose, data }) {
	const [createCategory, setCreateCategory] = useState<PropsCategory>({
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
	};

	return (
		<Dialog onClick={handleClose} className='w-80 h-72'>
			<div className=''>
				<TextField
					placeholder='category'
					onChange={handleChangeTitleCategory}
				/>
				<TextField
					placeholder='url'
					onChange={handleChangeUrlCategory}
				/>
				<Button onClick={handleClick} className='mx-auto'>
					Створити
				</Button>
			</div>
		</Dialog>
	);
}
