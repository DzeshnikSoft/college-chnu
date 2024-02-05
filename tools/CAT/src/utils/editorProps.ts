export interface Editor {
	toolbar: string;
	plugins: string[];
}

export const itemsEditor: Editor = {
	toolbar:
		'undo redo | formatselect | ' +
		'bold fontsize italic backcolor | alignleft aligncenter ' +
		'alignright alignjustify | bullist numlist outdent indent |  fontsizeselect forecolor' +
		'removeformat | help | indent | fontsizeselect | image | link',
	plugins: [
		'advlist autolink lists link image charmap print preview anchor',
		'searchreplace visualblocks code fullscreen',
		'link',
		'insertdatetime media table paste code help wordcount',
		'image',
	],
};
