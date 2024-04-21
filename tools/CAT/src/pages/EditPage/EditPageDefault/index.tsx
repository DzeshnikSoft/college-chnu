import EditorWrapper from '@/components/EditorWrapper';

interface EditPageDefaultProps {
	content: string;
	nameText: string;
}

export default function EditPageDefault({
	content,
	nameText,
}: EditPageDefaultProps) {
	return (
		<div className='w-full'>
			<EditorWrapper
				nameText={nameText}
				name='content'
				content={content}
			/>
		</div>
	);
}
