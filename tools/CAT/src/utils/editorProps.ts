export interface Editor {
	toolbar: string;
	plugins: string[];
}

export const itemsEditor: Editor = {
	toolbar:
		'undo redo | formatselect | ' +
		'bold underline italic fontsize forecolor backcolor | alignleft aligncenter ' +
		'alignright alignjustify | bullist numlist outdent indent |' +
		'removeformat | help | image | link | table |' +
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
		'table',
	],
};
