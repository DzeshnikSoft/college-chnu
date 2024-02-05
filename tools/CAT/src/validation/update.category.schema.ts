import * as Yup from 'yup';
import { REQUIRED_FIELD } from '@/utils/schemaValues';

export const updateCategoriesSchema = (reduxState, currentCategoryId) => {
	return Yup.object().shape({
		title: Yup.string()
			.required(REQUIRED_FIELD)
			.test(
				'unique-title',
				'Така назва для категорії вже існує',
				function (value) {
					const isTitleUnique = !reduxState.some(
						(item) =>
							item.title === value &&
							item.id !== currentCategoryId
					);

					return isTitleUnique;
				}
			),
		url: Yup.string()
			.matches(
				/^[a-z\-]*$/,
				'Усі літери мають бути малими та з алфавіту латині'
			)
			.required(REQUIRED_FIELD)
			.test(
				'unique-url',
				'Такий шлях до категорії вже існує',
				function (value) {
					const isUrlUnique = !reduxState.some(
						(item) =>
							item.url === value && item.id !== currentCategoryId
					);

					return isUrlUnique;
				}
			),
	});
};
