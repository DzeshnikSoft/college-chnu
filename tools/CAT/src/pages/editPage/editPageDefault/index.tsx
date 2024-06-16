import EditorWrapper from '@/components/EditorWrapper';

interface EditPageDefaultProps {
	content: string;
	textContent: string;
}

export default function EditPageDefault({
	content,
	textContent,
}: EditPageDefaultProps) {
	return (
		<div className='w-full'>
			<EditorWrapper
				textContent={textContent}
				name='content'
				content={content}
			/>
		</div>
	);
}
