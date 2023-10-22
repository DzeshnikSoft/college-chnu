import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { itemsEditor } from '../../utils/editorProps'
export default function TestEditor() {
  const editorRef = useRef(null);

  const log = () => {
	if (editorRef.current) {
	  	console.log(editorRef.current.getContent());
	}
  };

  return (
	<>
	  <Editor
	 	apiKey={import.meta.env.VITE_KEY_TINY}
		onInit={(evt, editor) => editorRef.current = editor}
		initialValue="<p>This is the initial content of the editor.</p>"
		init={{
			height: 500,
			width: 1000,
			menubar: false,
			images_upload_url:"",
			file_picker_callback: (callback, value, meta) => {
				
		  	},
			plugins: itemsEditor.plugins,
			toolbar: itemsEditor.toolbar,
			content_style: 'body { font-family:Roboto,sans-serif; font-size:14px }'
		}}
	  />
	  <button onClick={log}>Log editor content</button>
	</>
  );
}
