namespace College.Shared.Extensions;

public static class ThrowIfNullExtensions
{
    public static T ThrowIfNull<T>(this T argument)
    {
        ArgumentNullException.ThrowIfNull(argument);

        return argument;
    }
}