import * as Yup from 'yup';
import { REQUIRED_FIELD } from '@/utils/schemaValues';

export const createCategoriesSchema = (data) => {
	return Yup.object().shape({
		title: Yup.string()
			.required(REQUIRED_FIELD)
			.test(
				'unique-title',
				'Така назва для категорії вже існує',
				function (value) {
					// Check if the title already exists in the Redux state
					const isTitleUnique = !data.some(
						(item) => item.title === value
					);

					return isTitleUnique;
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
				'Такий шлях до категорії вже існує',
				function (value) {
					// Check if the URL already exists in the Redux state
					const isUrlUnique = !data.some(
						(item) => item.url === value
					);

					return isUrlUnique;
				}
			),
	});
};
