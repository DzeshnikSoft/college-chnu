import EditorWrapper from '@/components/EditorWrapper';

interface editPageDefaultProps {
	content: string;
	textContent: string;
}

export default function editPageDefault({
	content,
	textContent,
}: editPageDefaultProps) {
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
