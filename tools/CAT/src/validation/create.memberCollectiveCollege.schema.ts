import * as Yup from 'yup';
import { REQUIRED_FIELD } from '@/utils/schemaValues';

export const createMemberCollectiveCollegeSchema = () => {
	return Yup.object().shape({
		title: Yup.string().required(REQUIRED_FIELD),
		description: Yup.string().required(REQUIRED_FIELD),
		image: Yup.object().shape({
			url: Yup.string().required(REQUIRED_FIELD),
		}),
		url: Yup.string().required(REQUIRED_FIELD),
	});
};
