import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { itemsEditor } from "../../utils/editorProps";

export default function EditorWrapper() {
	const editorRef = useRef(null);

	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};

	return (
		<div className='w-10/12 mx-auto'>
			<Editor
				apiKey={import.meta.env.VITE_KEY_TINY}
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue='<p>This is the initial content of the editor.</p>'
				init={{
					height: 500,
					width: "100%",
					menubar: "insert",
					images_upload_url: "",
					file_picker_types: "file image media",
					file_picker_callback: (callback, value, meta) => {},
					plugins: itemsEditor.plugins, // Додайте "link" до списку плагінів
					toolbar: itemsEditor.toolbar,
					default_link_target: "_blank",
					content_style:
						"body { font-family:Roboto,sans-serif; font-size:14px;}",
				}}
			/>
			<button onClick={log}>Log editor content</button>
		</div>
	);
}
