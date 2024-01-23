import EditDefaultInput from '@/components/EditDefaultInput';
import { ErrorMessage } from 'formik';

interface EditTitlePageState {
	label: string;
	url: string;
}

export default function EditTitlePage({ label, url }: EditTitlePageState) {
	return (
		<div className='h-72 w-full relative border'>
			<img className='w-full h-full object-cover' src={url} alt='' />
			<div className='absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 flex flex-col'>
				<EditDefaultInput
					name='template.label'
					placeholder='Введіть заголовок'
					id='template-label'
					className='flex min-w-72 w-fit max-w-fit h-fit '
					value={label}
				/>
				<ErrorMessage
					className='text-red mb-2 text-xs'
					name='template.label'
					component='span'
				/>
			</div>
			<div className='!absolute bottom-5 right-5 flex flex-col'>
				<EditDefaultInput
					placeholder='Введіть посилання'
					name='template.image.url'
					id='template-image-url'
					value={url}
				/>
				<ErrorMessage
					className='text-red mb-2 text-xs bg-white p-2'
					name='template.image.url'
					component='span'
				/>
			</div>
		</div>
	);
}
