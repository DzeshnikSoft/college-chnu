import { ReactNode, useState } from 'react';
import { useDeletePageMutation } from '@/store/apis/categories';
import DeleteButton from '@/components/DeleteButton';
import EditPage from '@/pages/EditPage';

interface ListItemProps {
	children?: ReactNode;
	id: string;
	subCategoryId: string;
	parentUrl;
}

export default function ListItem({
	children,
	id,
	parentUrl,
	subCategoryId,
}: ListItemProps) {
	const [isHovering, setIsHovering] = useState<boolean>(false);
	const [isOpenEditorPage, setIsOpenEditorPage] = useState<boolean>(false);
	const [deletePage] = useDeletePageMutation();

	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};
	const handleDelete = (e) => {
		e.stopPropagation();
		deletePage(id);
	};
	const handleOpen = () => {
		setIsOpenEditorPage(true);
	};
	const handleCloseEditDialog = () => {
		setIsOpenEditorPage(false);
	};
	return (
		<li
			className='p-2 cursor-pointer relative border-b last:border-b-0 hover:bg-activeItems'
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onClick={handleOpen}>
			{children}
			{isHovering === true && (
				<DeleteButton
					onClick={handleDelete}
					className='!w-5 !h-7 !text-sm !pl-0 !pr-0 top-1/2 right-0 !absolute transform -translate-x-1/2 -translate-y-1/2'
				/>
			)}
			{isOpenEditorPage && (
				<EditPage
					handleClose={handleCloseEditDialog}
					parentUrl={parentUrl}
					id={id}
					subCategoryId={subCategoryId}
				/>
			)}
		</li>
	);
}
