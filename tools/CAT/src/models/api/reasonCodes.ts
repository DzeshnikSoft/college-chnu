// 400 ...
export enum BadRequestReasonCode {
	EntityNotFound = 'college_api_entity_not_found_error',
	IncorrectLoginOrPassword = 'college_api_incorrect_login_or_password',
}

// 500 ...
export enum ServerErrorReasonCode {
	InternalServerError = 'college_api_internal_server_error',
}
