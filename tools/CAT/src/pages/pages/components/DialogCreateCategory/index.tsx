import { useState } from 'react';
import Dialog from '@/components/Dialog';
import Button from '@/components/Button';
import Edit from '@/components/Edit';
import { addCategory } from '@/app/features/categories/categoryThunks';
import { useAppDispatch } from '@/app/hooks';

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
		title: '',
		url: '',
	});
	const dispatch = useAppDispatch();

	const handleChangeTitleCategory = ({ target }) => {
		setCreateCategory({ ...createCategory, title: target.value });
	};
	const handleChangeUrlCategory = ({ target }) => {
		setCreateCategory({ ...createCategory, url: target.value });
	};
	const handleClick = () => {
		dispatch(addCategory(createCategory));
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
