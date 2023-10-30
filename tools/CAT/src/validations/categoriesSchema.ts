import * as Yup from "yup";

export const categoriesSchema = Yup.object().shape({
	category: Yup.string().required("Поле обов'язкове для заповнення"),
	url: Yup.string()
		.matches(
			/^[a-z\-]*$/,
			"Усі літери мають бути малими та з алфавіту латині"
		)
		.required("Поле обов'язкове для заповнення"),
});
