import * as Yup from 'yup';

function findSubCategoryById(mainArray, subCategoryId) {
	const category = mainArray.find((category) =>
		category.subCategories.some(
			(subCategory) => subCategory.id === subCategoryId
		)
	);

	return category
		? category.subCategories.find(
				(subCategory) => subCategory.id === subCategoryId
		  )
		: null;
}

export const createPageSchema = (reduxState, subCategoryId) => {
	const subCategory = findSubCategoryById(reduxState, subCategoryId);
	const pages = subCategory.pages;

	return Yup.object().shape({
		title: Yup.string()
			.required("Поле обов'язкове для заповнення")
			.test(
				'unique-title',
				'Така назва для сторінки в даній підкатегорії вже існує',
				function (value) {
					return !pages.some((item) => item.title === value);
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
				'Такий шлях до сторінки в даній підкатегорії вже існує',
				function (value) {
					return !pages.some((item) => item.url === value);
				}
			),
		template: Yup.object().shape({
			type: Yup.number()
				.notOneOf([-1], ({ value }) => {
					return 'Оберіть шаблон для сторінки';
				})
				.required('Оберіть шаблон для сторінки'),
		}),
	});
};
