import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import AddButton from '../../components/AddButton';
import SeparatePage from './SeparatePage';
import DialogCreateSeparatePage from './DialogCreateSeparatePage';

function SeparatePages() {
	const [isOpenDialogCreateSeparatePage, setIsOpenDialogCreateSeparatePage] =
		useState<boolean>(false);

	const openDialogCreateSeparatePage = () => {
		setIsOpenDialogCreateSeparatePage(true);
	};
	const closeDialogCreateSeparatePage = () => {
		setIsOpenDialogCreateSeparatePage(false);
	};
	const searchPages = () => {};
	return (
		<div className='h-full w-full flex news-card'>
			{isOpenDialogCreateSeparatePage && (
				<DialogCreateSeparatePage
					parentUrl={`${import.meta.env.VITE_API_VIEW_URL}/`}
					subCategoryId=''
					handleClose={closeDialogCreateSeparatePage}
				/>
			)}
			<div className='w-11/12 h-full mx-auto flex flex-col'>
				<div className='w-full h-1/6 flex items-center justify-between'>
					<AddButton
						onClick={openDialogCreateSeparatePage}
						className='!mx-0'>
						Додати сторінку
					</AddButton>

					<div className='!w-5/12'>
						<InputGroup>
							<InputLeftElement>
								<SearchIcon />
							</InputLeftElement>
							<Input
								onChange={searchPages}
								placeholder='Знайти сторінку'
								// value={searchText}
							/>
						</InputGroup>
					</div>
				</div>
				<div className='h-5/6 grid grid-cols-2 gap-10 pt-10 overflow-y-scroll'>
					<SeparatePage />
					<SeparatePage />
					<SeparatePage />
					<SeparatePage />
					<SeparatePage />
					<SeparatePage />
					<SeparatePage />
					<SeparatePage />
					<SeparatePage />
				</div>
			</div>
		</div>
	);
}

export default SeparatePages;
