namespace College.API.Exceptions;

public static class ApiReasonCodes
{
    public const string EntityNotFound = "college_api_entity_not_found_error";
    public const string IncorrectAdminLoginOrPassword = "college_api_incorrect_login_or_password";
    public const string UrlAlreadyExist = "college_api_item_with_this_url_already_exist";

    // 500...
    public const string InternalServerError = "college_api_internal_server_error";
}
