import { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { itemsEditor } from '../../utils/editorProps';
import { Button } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import uploadFile from '@/app/apis/uploadFile';

interface EditorWrapperProps {
	content: string;
	name: string;
	textContent: string;
	descriptionNews?: string;
	imageUrlNews?: string;
}

export default function EditorWrapper({
	content,
	name,
	textContent,
	descriptionNews,
	imageUrlNews,
}: EditorWrapperProps) {
	const { setFieldValue } = useFormikContext();
	const editorRef = useRef(null);
	const [currentChanges, setCurrentChanges] = useState('');
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [isSavedNewsInfo, setIsSavedNewsInfo] = useState(false);
	const newsInfo = `<p>${descriptionNews}</p> <img src=${imageUrlNews} />`;
	const handleClick = () => {
		setIsSavedNewsInfo(true);
		if (editorRef.current) {
			setFieldValue(name, editorRef.current.getContent());
			setFieldValue(
				textContent,
				editorRef.current.getContent({ format: 'text' })
			);
		}
	};

	useEffect(() => {}, []);

	return (
		<div className='w-10/12 mx-auto flex flex-col relative'>
			<Editor
				apiKey={import.meta.env.VITE_KEY_TINY}
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue={`${
					!isSavedNewsInfo && descriptionNews ? newsInfo : ''
				} ${content}`}
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
					fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt',
					style_formats: [
						{
							title: 'Bullet list',
							items: [
								{
									title: 'Disc',
									format: 'list',
									icon: 'disc',
									selector: 'ul',
									styles: { 'list-style-type': 'disc' },
								},
								{
									title: 'Circle',
									format: 'list',
									icon: 'circle',
									selector: 'ul',
									styles: { 'list-style-type': 'circle' },
								},
								{
									title: 'Square',
									format: 'list',
									icon: 'square',
									selector: 'ul',
									styles: { 'list-style-type': 'square' },
								},
							],
						},
					],
					default_link_target: '_blank',
					content_style: `body { font-family:Roboto,sans-serif; font-size:16px; color:#1A3853}  ul > li {
							// color: #25b37c;
						  }`,
				}}
			/>
			<Button
				className='!absolute !z-50 top-0 right-0 ml-auto mr-3 mt-2 animate-pulse'
				onClick={handleClick}>
				Зберегти дані в редакторі
			</Button>
		</div>
	);
}
