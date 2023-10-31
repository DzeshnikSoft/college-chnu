import { useState } from "react";
import { useDispatch } from "react-redux";

import Edit from "@/components/Edit";
import { SubCategoryDto } from "@/models/api";
import { changeTitleItemSubCategories } from "@/store/features/admin.feature";

import List from "../List";

interface SubCategories {
	id: string;
	newTitle: string;
}

export default function SubCategories({ title, pages, id }: SubCategoryDto) {
	const dispatch = useDispatch();
	const [subCategory, setSubCategory] = useState<SubCategories>({
		id: id,
		newTitle: title,
	});

	const handleChange = ({ target }) => {
		setSubCategory({ id: id, newTitle: target.value });
	};

	const handleClick = () => {
		dispatch(changeTitleItemSubCategories(subCategory));
	};
	return (
		<div className='h-full w-full'>
			<div className='w-full flex items-center justify-between mb-5'>
				<Edit
					title={subCategory.newTitle}
					onChange={handleChange}
					onClick={handleClick}
				/>
			</div>
			<List pages={pages} />
		</div>
	);
}
