export interface Editor {
	toolbar: string;
	plugins: string[];
}

export const itemsEditor: Editor = {
	toolbar:
		"undo redo | formatselect | " +
		"bold italic backcolor | alignleft aligncenter " +
		"alignright alignjustify | bullist numlist outdent indent | " +
		"removeformat | help | indent | fontsizeselect | image",
	plugins: [
		"advlist autolink lists link image charmap print preview anchor",
		"searchreplace visualblocks code fullscreen",
		"insertdatetime media table paste code help wordcount",
		"image",
	],
};
