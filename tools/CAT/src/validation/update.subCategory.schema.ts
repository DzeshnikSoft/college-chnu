import * as Yup from 'yup';

export const updateSubCategoriesSchema = (
	reduxState,
	categoryId,
	subCategoryId
) => {
	const category = reduxState.filter((item) => item.id === categoryId);

	const subCategories = category[0].subCategories;

	return Yup.object().shape({
		title: Yup.string()
			.required("Поле обов'язкове для заповнення")
			.test(
				'unique-title',
				'Така назва для підкатегорії в даній категорії вже існує',
				function (value) {
					return !subCategories.some(
						(item) =>
							item.title === value && item.id !== subCategoryId
					);
				}
			),
		url: Yup.string()
			.matches(
				/^[a-z]+(-[a-z]+)*$/,
				'Усі літери мають бути малими та з алфавіту латині. "-" може бути тільки між буквами.'
			)
			.required("Поле обов'язкове для заповнення")
			.test(
				'unique-url',
				'Такий шлях до підкатегорії в даній категорії вже існує',
				function (value) {
					return !subCategories.some(
						(item) =>
							item.url === value && item.id !== subCategoryId
					);
				}
			),
	});
};
