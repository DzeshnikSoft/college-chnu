import { useState } from 'react';
import AddButton from '@/components/AddButton';
import { PageDto } from '@/models/api';
import DialogCreatePage from '../DialogCreatePage';
import ListItem from '../ListItem';

interface ListProps {
	pages: PageDto[];
}

export default function List({
	pages,
	subCategoryId,
	parentUrl,
}: ListProps & { subCategoryId: string } & { parentUrl: string }) {
	const [isDialogCreatePage, setIsDialogCreatePage] =
		useState<boolean>(false);

	const handleClose = () => {
		setIsDialogCreatePage(false);
	};

	const handleOpen = () => {
		setIsDialogCreatePage(true);
	};
	return (
		<ul className='flex flex-col overflow-hidden'>
			{pages?.map(({ title, id, subCategoryId, url }, index) => (
				<ListItem
					id={id}
					parentUrl={parentUrl}
					key={index}
					url={url}
					subCategoryId={subCategoryId}>
					{' '}
					{title}{' '}
				</ListItem>
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
