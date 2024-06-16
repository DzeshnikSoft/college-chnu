import * as Yup from 'yup';
import { REQUIRED_FIELD } from '@/utils/schemaValues';

export const createNewsSchema = (data) => {
	return Yup.object().shape({
		title: Yup.string().required(REQUIRED_FIELD),
		image: Yup.object().shape({
			url: Yup.string().required(REQUIRED_FIELD),
		}),
		description: Yup.string().required(REQUIRED_FIELD),
		content: Yup.string().required(REQUIRED_FIELD),
		url: Yup.string().required(REQUIRED_FIELD),
		date: Yup.string().required(REQUIRED_FIELD),
		titleBackgroundImage: Yup.object().shape({
			url: Yup.string().required(REQUIRED_FIELD),
		}),
	});
};
