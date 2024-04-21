import EditorWrapper from '@/components/EditorWrapper';
import EditTitlePage from '@/components/EditTitlePage';

interface EditPageDefaultProps {
	content: string;
	title: string;
	nameText: string;
	img: string;
}

export default function EditPageWithTitle({
	title,
	content,
	img,
	nameText,
}: EditPageDefaultProps) {
	return (
		<div className='w-full'>
			<EditTitlePage
				nameLabel='template.label'
				nameUrl='template.image.url'
				label={title}
				url={img}
			/>
			<EditorWrapper
				nameText={nameText}
				name='content'
				content={content}
			/>
		</div>
	);
}
