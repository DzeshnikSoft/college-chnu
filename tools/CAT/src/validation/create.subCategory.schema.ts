import * as Yup from 'yup';
import { REQUIRED_FIELD } from '@/utils/schemaValues';

export const createSubCategoriesSchema = (reduxState, categoryId) => {
	const category = reduxState.filter((item) => item.id === categoryId);

	const subCategories = category[0].subCategories;

	return Yup.object().shape({
		title: Yup.string()
			.required(REQUIRED_FIELD)
			.test(
				'unique-title',
				'Така назва для підкатегорії в даній категорії вже існує',
				function (value) {
					return !subCategories.some((item) => item.title === value);
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
				'Такий шлях до підкатегорії в даній категорії вже існує',
				function (value) {
					return !subCategories.some((item) => item.url === value);
				}
			),
	});
};
