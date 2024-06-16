namespace College.Shared.Extensions;

public static class StringExtensions
{
    public static string ToTextOnlyString(this string str) => str.Trim().ReplaceLineEndings().Replace("\r\n", " ");
}
