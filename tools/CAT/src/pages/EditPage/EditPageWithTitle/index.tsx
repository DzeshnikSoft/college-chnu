import EditorWrapper from '@/components/EditorWrapper';
import EditTitlePage from '@/components/EditTitlePage';

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
			<EditTitlePage
				nameLabel='template.label'
				nameUrl='template.image.url'
				label={title}
				url={img}
			/>
			<EditorWrapper name='content' content={content} />
		</div>
	);
}
