import EditorWrapper from '@/components/EditorWrapper';

interface EditPageDefaultProps {
	content: string;
}

export default function EditPageDefault({ content }: EditPageDefaultProps) {
	return (
		<div className='w-full'>
			<EditorWrapper content={content} />
		</div>
	);
}
