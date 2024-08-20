import EditHTMLWrapper from '@/components/EditHTMLWrapper';
import EditTitlePage from '@/components/EditTitlePage';

interface EditPageWithHTMLProps {
	content: string;
	title: string;
	textContent: string;
	img: string;
}

function EditPageWithHTML({
	title,
	content,
	img,
	textContent,
}: EditPageWithHTMLProps) {
	return (
		<div className='w-full'>
			<EditTitlePage
				nameLabel='template.label'
				nameUrl='template.image.url'
				label={title}
				url={img}
			/>
			<EditHTMLWrapper html={content} />
		</div>
	);
}

export default EditPageWithHTML;
