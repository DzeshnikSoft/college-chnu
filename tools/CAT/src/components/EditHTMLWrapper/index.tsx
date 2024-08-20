import DOMPurify from 'dompurify';
import EditTextArea from '../EditTextArea';

interface EditHTMLWrapperProps {
	html: string;
}

function EditHTMLWrapper({ html }: EditHTMLWrapperProps) {
	const sanitizedHtml = DOMPurify.sanitize(html);
	return (
		<div className='w-full flex flex-col'>
			<div className='w-10/12 h-32 flex flex-col mx-auto my-10'>
				<EditTextArea
					id='content'
					name='content'
					nameInput='HTML'
					placeholder='Введіть ваш html'
				/>
			</div>

			<div
				className='w-10/12 h-full overflow-y-auto mx-auto text-colorTextColor mt-3 mb-10'
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		</div>
	);
}

export default EditHTMLWrapper;
