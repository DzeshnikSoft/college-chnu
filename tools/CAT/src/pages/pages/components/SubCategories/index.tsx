import { useState } from "react";
import { useDispatch } from "react-redux";

import List from "../List";
import Edit from "@/components/Edit";

import { changeTitleItemSubCategories } from "@/store/features/pagesAdmin.feature";
interface SubCategories {
	id: string;
	newTitle: string;
}
export default function SubCategories({ title, pages, id }) {
	const [subCategory, setSubCategory] = useState<SubCategories>({
		id: id,
		newTitle: title,
	});

	const dispatch = useDispatch();
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
