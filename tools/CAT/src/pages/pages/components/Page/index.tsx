import { useState } from "react";
import { useDispatch } from "react-redux";

import SubCategories from "../SubCategories";
import AddButton from "../../../../components/AddButton";
import CloseButton from "../../../../components/CloseButton";
import EditTitle from "@/components/Edit";

import { CategoryDto } from "@/models/api";
import { changeTitleCategory } from "@/store/features/admin.feature";

interface PageState {
	id: string;
	newTitle: string;
}

export default function Page({ title, subCategories, id }: CategoryDto) {
	const [page, setPage] = useState<PageState>({
		id: id,
		newTitle: title,
	});
	const dispatch = useDispatch();

	const handleChange = ({ target }) => {
		setPage({ id, newTitle: target.value });
	};
	const handleClick = () => {
		dispatch(changeTitleCategory(page));
	};
	return (
		<div className='w-full flex flex-col h-full '>
			<div className='w-full flex mb-10'>
				<div className='ml-24'>
					<EditTitle
						title={page.newTitle}
						onChange={handleChange}
						onClick={handleClick}
					/>
				</div>
				<CloseButton className='ml-auto mr-20' />
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
