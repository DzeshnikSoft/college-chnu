import * as Yup from 'yup';
import { REQUIRED_FIELD } from '@/utils/schemaValues';

export const loginValidationSchema = Yup.object({
	login: Yup.string().required("Логін є обов'язковим полем"),
	password: Yup.string().required("Пароль є обов'язковим полем"),
});
