#nullable enable
namespace College.Domain.Models;

public class Page
{
    public Guid Id { get; set; }

    public string Url { get; set; }

    public string Title { get; set; }

    /// <summary>
    /// HTML Page content. Required Filed for each page.
    /// </summary>
    public string Content { get; set; }

    /// <summary>
    /// Template for each page. If TemplateType == Default ==> This is null.
    /// </summary>
    public Template Template { get; set; }

    public SubCategory? SubCategory { get; set; }

    public Guid SubCategoryId { get; set; }
}
