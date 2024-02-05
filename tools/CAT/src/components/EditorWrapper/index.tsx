import { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { itemsEditor } from '../../utils/editorProps';
import { Button } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import uploadFile from '@/store/apis/uploadFile';

interface EditorWrapperProps {
	content: string;
	name: string;
}

export default function EditorWrapper({ content, name }: EditorWrapperProps) {
	const { setFieldValue } = useFormikContext();
	const editorRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [url, setUrl] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const handleClick = () => {
		if (editorRef.current) {
			setFieldValue(name, editorRef.current.getContent());
		}
	};

	return (
		<div className='w-10/12 mx-auto flex flex-col relative'>
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
					file_picker_callback: function (cb, value, meta) {
						var input = document.createElement('input');
						input.setAttribute('type', 'file');
						input.setAttribute(
							'accept',
							'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
						);

						input.onchange = function () {
							var file = this.files[0];
							var reader = new FileReader();
							setSelectedFile(file);

							reader.onload = async function () {
								const uploadedUrl = await uploadFile(
									file,
									setLoading
								);
								if (uploadedUrl !== null) {
									cb(uploadedUrl, {});
								}
							};

							reader.readAsDataURL(file);
						};

						input.click();
					},

					plugins: itemsEditor.plugins,
					toolbar: itemsEditor.toolbar,
					fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
					default_link_target: '_blank',
					content_style:
						'body { font-family:Roboto,sans-serif; font-size:14px;}',
				}}
			/>
			<Button
				className='!absolute !z-50 top-0 right-0 ml-auto mr-3 mt-2'
				onClick={handleClick}>
				Зберегти дані в редакторі
			</Button>
		</div>
	);
}
