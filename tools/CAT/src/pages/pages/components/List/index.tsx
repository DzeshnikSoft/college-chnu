import { useState } from "react";
import AddButton from "@/components/AddButton";
import { PageDto } from "@/models/api";
import DialogCreatePage from "../DialogCreatePage";
import ListItem from "../ListItem";

interface ListProps {
	pages: PageDto[];
}

interface PageState {
	subCategoryId: string;
	title: string;
	url: string;
	content: string;
}
export default function List({
	pages,
	subCategoryId,
	parentUrl,
}: ListProps & { subCategoryId: string } & { parentUrl: string }) {
	const [isDialogCreatePage, setIsDialogCreatePage] =
		useState<boolean>(false);
	const [page, setPage] = useState<PageState>({
		subCategoryId: subCategoryId,
		title: "",
		url: "",
		content: "",
	});
	const handleClose = () => {
		setIsDialogCreatePage(false);
	};
	const handleOpen = () => {
		setIsDialogCreatePage(true);
	};
	return (
		<ul className='flex flex-col overflow-hidden'>
			{pages.map(({ title, id }) => (
				<ListItem id={id}> {title} </ListItem>
			))}
			<AddButton className='mt-2' onClick={handleOpen}>
				Додати сторінку
			</AddButton>
			{isDialogCreatePage && (
				<DialogCreatePage
					handleClose={handleClose}
					parentUrl={parentUrl}
					subCategoryId={subCategoryId}
				/>
			)}
		</ul>
	);
}
