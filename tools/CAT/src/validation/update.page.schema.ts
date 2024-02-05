import * as Yup from 'yup';
import { REQUIRED_FIELD } from '@/utils/schemaValues';

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

export const updatePageSchema = (reduxState, subCategoryId, pageId) => {
	const subCategory = findSubCategoryById(reduxState, subCategoryId);
	const pages = subCategory.pages;

	return Yup.object().shape({
		title: Yup.string()
			.required(REQUIRED_FIELD)
			.test(
				'unique-title',
				'Така назва для сторінки в даній підкатегорії вже існує',
				function (value) {
					return !pages.some(
						(item) => item.title === value && item.id !== pageId
					);
				}
			),
		url: Yup.string()
			.matches(
				/^[a-z]+(-[a-z]+)*$/,
				'Усі літери мають бути малими та з алфавіту латині. "-" може бути тільки між буквами.'
			)
			.required(REQUIRED_FIELD)
			.test(
				'unique-url',
				'Такий шлях до сторінки в даній підкатегорії вже існує',
				function (value) {
					return !pages.some(
						(item) => item.url === value && item.id !== pageId
					);
				}
			),
		template: Yup.object().shape({
			type: Yup.number().required(REQUIRED_FIELD),
			image: Yup.object().when('type', {
				is: 1,
				then: (schema) =>
					Yup.object().shape({
						url: Yup.string().required(REQUIRED_FIELD),
					}),
			}),

			label: Yup.string().when('type', {
				is: 1,
				then: (schema) => schema.required(REQUIRED_FIELD),
			}),
		}),
	});
};
