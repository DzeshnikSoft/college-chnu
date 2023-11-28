import EditorWrapper from '@/components/EditorWrapper';
interface EditPageDefaultProps {
	content: string;
	handleChangeContent: (e) => void;
}
export default function EditPageDefault({
	content,
	handleChangeContent,
}: EditPageDefaultProps) {
	return (
		<div className='w-full'>
			<EditorWrapper
				handleChangeContent={handleChangeContent}
				content={content}
			/>
		</div>
	);
}
