import { useState, useEffect } from "react";
import EditDefaultInput from "@/components/EditDefaultInput";

interface EditTitlePageState {
	title: string;
	imageUrl: string;
}

export default function EditTitlePage() {
	const [initialValue, setInitialValue] = useState<EditTitlePageState>({
		title: "",
		imageUrl: "",
	});

	const handleSave = () => {};

	const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setInitialValue({ ...initialValue, title: value });
	};

	const handleChangeImageUrl = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = event.target;
		setInitialValue({ ...initialValue, imageUrl: value });
	};

	return (
		<div className='h-72 w-full relative border'>
			<img
				className='w-full h-full object-cover'
				src={initialValue.imageUrl}
				alt=''
			/>
			<EditDefaultInput
				onChange={handleChangeTitle}
				onClick={handleSave}
				placeholder='Введіть заголовок'
				value={initialValue.title}
				className='absolute flex min-w-72 w-fit max-w-fit h-fit top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'
			/>
			<EditDefaultInput
				onChange={handleChangeImageUrl}
				onClick={handleSave}
				placeholder='Введіть посилання'
				value={initialValue.imageUrl}
				className='!absolute bottom-5 right-5'
			/>
		</div>
	);
}
