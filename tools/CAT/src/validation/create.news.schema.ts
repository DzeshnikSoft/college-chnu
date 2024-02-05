import * as Yup from 'yup';

export const createNewsSchema = (data) => {
	return Yup.object().shape({
		title: Yup.string().required("Поле обов'язкове для заповнення"),
		image: Yup.object().shape({
			url: Yup.string().required("Поле обов'язкове для заповнення"),
		}),
		description: Yup.string().required("Поле обов'язкове для заповнення"),
		content: Yup.string().required("Поле обов'язкове для заповнення"),
		url: Yup.string().required("Поле обов'язкове для заповнення"),
		date: Yup.string().required("Поле обов'язкове для заповнення"),
		titleBackgroundImage: Yup.object().shape({
			url: Yup.string().required("Поле обов'язкове для заповнення"),
		}),
	});
};
