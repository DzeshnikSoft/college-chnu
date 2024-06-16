export interface Editor {
	toolbar: string;
	plugins: string[];
}

export const itemsEditor: Editor = {
	toolbar:
		'undo redo | formatselect | ' +
		'bold fontsize italic forecolor backcolor | alignleft aligncenter ' +
		'alignright alignjustify | bullist numlist outdent indent |' +
		'removeformat | help | image | link |' +
		'columnbutton',

	plugins: [
		'advlist autolink lists link image charmap print preview anchor',
		'textcolor',
		'lists',
		'searchreplace visualblocks code fullscreen',
		'link',
		'insertdatetime media table paste code help wordcount',
		'image',
		'column',
	],
};
