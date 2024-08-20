import EditHTMLWrapper from '@/components/EditHTMLWrapper';

interface EditPageDefaultProps {
	content: string;
	textContent: string;
}

export default function EditPageDefault({
	content,
	textContent,
}: EditPageDefaultProps) {
	return (
		<div className='w-full flex flex-col'>
			<EditHTMLWrapper html={content} />
		</div>
	);
}
