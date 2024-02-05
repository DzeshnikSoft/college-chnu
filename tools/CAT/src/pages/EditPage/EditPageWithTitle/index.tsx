import EditorWrapper from '@/components/EditorWrapper';
import EditTitlePage from '@/pages/editPage/editPageWithTitle/components/EditTitlePage';

interface EditPageDefaultProps {
	content: string;
	title: string;
	img: string;
}

export default function EditPageWithTitle({
	title,
	content,
	img,
}: EditPageDefaultProps) {
	return (
		<div className='w-full'>
			<EditTitlePage label={title} url={img} />
			{/* <EditorWrapper content={content} /> */}
		</div>
	);
}
