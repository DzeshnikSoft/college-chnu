import * as Yup from 'yup';

export const updateNewsSchema = (data) => {
	return Yup.object().shape({
		title: Yup.string().required("Поле обов'язкове для заповнення"),
		mainImage: Yup.string().required("Поле обов'язкове для заповнення"),
		description: Yup.string().required("Поле обов'язкове для заповнення"),
		content: Yup.string().required("Поле обов'язкове для заповнення"),
		date: Yup.string().required("Поле обов'язкове для заповнення"),
	});
};
