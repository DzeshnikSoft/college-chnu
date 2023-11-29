import EditorWrapper from '@/components/EditorWrapper';
import EditTitlePage from './components/EditTItlePage';

interface EditPageDefaultProps {
	content: string;
	handleChangeContent: (e) => void;
	handleChangeTemplateData: (e) => void;
	title: string;
	img: string;
}

export default function EditPageWithTitle({
	handleChangeContent,
	handleChangeTemplateData,
	title,
	content,
	img,
}: EditPageDefaultProps) {
	return (
		<div className='w-full'>
			<EditTitlePage
				handleChangeTemplateData={handleChangeTemplateData}
				title={title}
				img={img}
			/>
			<EditorWrapper
				handleChangeContent={handleChangeContent}
				content={content}
			/>
		</div>
	);
}
