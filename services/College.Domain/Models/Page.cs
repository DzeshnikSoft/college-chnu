#nullable enable
namespace College.Domain.Models;

public class Page
{
    public Guid Id { get; set; }

    public string Url { get; set; }

    public string Title { get; set; }

    /// <summary>
    /// HTML Page content
    /// </summary>
    public string Content { get; set; }

    public SubCategory? SubCategory { get; set; }

    public Guid SubCategoryId { get; set; }
}
