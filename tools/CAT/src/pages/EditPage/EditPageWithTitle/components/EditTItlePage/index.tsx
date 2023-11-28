import { useState, useEffect } from 'react';
import EditDefaultInput from '@/components/EditDefaultInput';

interface EditTitlePageState {
	label: string;
	url: string;
}

export default function EditTitlePage({
	title,
	img,
	handleChangeTemplateData,
}) {
	const [initialValue, setInitialValue] = useState<EditTitlePageState>({
		label: title,
		url: img,
	});

	const handleSave = () => {
		handleChangeTemplateData(initialValue);
	};

	const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setInitialValue({ ...initialValue, label: value });
	};

	const handleChangeImageUrl = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = event.target;
		setInitialValue({ ...initialValue, url: value });
	};

	return (
		<div className='h-72 w-full relative border'>
			<img
				className='w-full h-full object-cover'
				src={initialValue.url}
				alt=''
			/>
			<EditDefaultInput
				onChange={handleChangeTitle}
				onClick={handleSave}
				placeholder='Введіть заголовок'
				value={initialValue.label}
				className='absolute flex min-w-72 w-fit max-w-fit h-fit top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'
			/>
			<EditDefaultInput
				onChange={handleChangeImageUrl}
				onClick={handleSave}
				placeholder='Введіть посилання'
				value={initialValue.url}
				className='!absolute bottom-5 right-5'
			/>
		</div>
	);
}
