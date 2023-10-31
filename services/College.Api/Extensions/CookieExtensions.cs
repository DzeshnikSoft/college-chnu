namespace College.API.Extensions;

public static class CookieExtensions
{
    private const string CookieApiKey = "college_api_key";

    public static void SetApiKey(this HttpContext context, string key)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.Now.AddDays(7),
            Secure = true,
        };

        context.Response.Cookies.Append(CookieApiKey, key, cookieOptions);
    }

    public static void RemoveApiKey(this HttpContext context)
    {
        context.Response.Cookies.Delete(CookieApiKey);
    }
}