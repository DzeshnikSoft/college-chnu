import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { itemsEditor } from '../../utils/editorProps';
import { Button } from '@chakra-ui/react';
interface EditorWrapperProps {
	content: string;
	handleChangeContent: (e) => void;
}
export default function EditorWrapper({
	content,
	handleChangeContent,
}: EditorWrapperProps) {
	const editorRef = useRef(null);

	const handleClick = () => {
		if (editorRef.current) {
			handleChangeContent(editorRef.current.getContent());
		}
	};

	return (
		<div className='w-10/12 mx-auto flex flex-col'>
			<Editor
				apiKey={import.meta.env.VITE_KEY_TINY}
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue={content}
				init={{
					height: 500,
					width: '100%',
					menubar: 'insert',
					images_upload_url: '',
					file_picker_types: 'file image media',
					file_picker_callback: (callback, value, meta) => {},
					plugins: itemsEditor.plugins,
					toolbar: itemsEditor.toolbar,
					fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
					default_link_target: '_blank',
					content_style:
						'body { font-family:Roboto,sans-serif; font-size:14px;}',
				}}
			/>
			<Button className='mx-auto' onClick={handleClick}>
				Зберегти дані в редакторі
			</Button>
		</div>
	);
}
