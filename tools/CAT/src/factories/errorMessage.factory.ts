import { ApiError } from '@/models/api';
import {
	BadRequestReasonCode,
	ConflictReasonCode,
	ServerErrorReasonCode,
} from '@/models/api/reasonCodes';

export const getErrorMessage = (
	error: ApiError,
	status: number = null
): string => {
	switch (error.reasonCode) {
		// 400...
		case BadRequestReasonCode.EntityNotFound:
			return 'Не знайдено';
		case BadRequestReasonCode.IncorrectLoginOrPassword:
			return 'Не правильний адмін логін або пароль!';

		// 409
		case ConflictReasonCode.UrlAlreadyExist:
			return 'Така URL вже існує, спробуйте інший варіант!';

		// 500...
		case ServerErrorReasonCode.InternalServerError:
			return 'На сервері щось пішло не так!';
		default:
			return 'Упс... Щось пішло не так!';
	}
};
