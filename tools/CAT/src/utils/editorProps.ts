export interface Editor {
	toolbar: string;
	plugins: string[];
}

export const itemsEditor: Editor = {
	toolbar:
		"undo redo | formatselect | " +
		"bold italic backcolor | alignleft aligncenter " +
		"alignright alignjustify | bullist numlist outdent indent | " +
		"removeformat | help | indent | fontsizeselect | image | link", // Додайте "link" сюди
	plugins: [
		"advlist autolink lists link image charmap print preview anchor",
		"searchreplace visualblocks code fullscreen",
		"link",
		"insertdatetime media table paste code help wordcount",
		"image",
	],
};
