namespace College.Domain.Models;

public class Image
{
    public Guid Id { get; set; }

    public string Url { get; set; }

    /// <summary>
    /// Can be null. Be careful
    /// </summary>
    public string Alt { get; set; }
}