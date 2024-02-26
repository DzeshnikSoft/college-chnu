import EditDefaultInput from '@/components/EditDefaultInput';
import { ErrorMessage } from 'formik';
import UploadFileWrapper from '@/components/UploadFileWrapper';
import { Field } from 'formik';

interface EditTitlePageState {
	label: string;
	url: string;
	nameLabel: string;
	nameUrl: string;
}

export default function EditTitlePage({
	label,
	url,
	nameLabel,
	nameUrl,
}: EditTitlePageState) {
	return (
		<div className='h-72 w-full relative border'>
			<img className='w-full h-full object-cover' src={url} alt='' />
			<div className='absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 flex flex-col'>
				<EditDefaultInput
					name={nameLabel}
					placeholder='Введіть заголовок'
					id={nameLabel}
					className='flex min-w-72 w-fit max-w-fit h-fit '
					value={label}
				/>
				<ErrorMessage
					className='text-red mb-2 text-xs'
					name={nameLabel}
					component='span'
				/>
			</div>
			<div className='!absolute bottom-5 right-5 flex flex-col'>
				<UploadFileWrapper
					value={url}
					nameInput='Виберіть зображення'
					name={nameUrl}
				/>
				<Field
					type='text'
					name={nameUrl}
					className='!rounded-none hidden'
				/>
				<ErrorMessage
					className='text-red mb-2 text-xs bg-white p-2'
					name={nameUrl}
					component='span'
				/>
			</div>
		</div>
	);
}
