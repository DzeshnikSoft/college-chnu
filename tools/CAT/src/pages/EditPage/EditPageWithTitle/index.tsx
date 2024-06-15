import EditorWrapper from '@/components/EditorWrapper';
import EditTitlePage from '@/components/EditTitlePage';

interface editPageDefaultProps {
	content: string;
	title: string;
	textContent: string;
	img: string;
}

export default function editPageWithTitle({
	title,
	content,
	img,
	textContent,
}: editPageDefaultProps) {
	return (
		<div className='w-full'>
			<EditTitlePage
				nameLabel='template.label'
				nameUrl='template.image.url'
				label={title}
				url={img}
			/>
			<EditorWrapper
				textContent={textContent}
				name='content'
				content={content}
			/>
		</div>
	);
}
