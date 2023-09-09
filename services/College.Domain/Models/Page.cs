namespace College.Domain.Models;

public class Page
{
    public Guid Id { get; set; }

    public string CustomUrl { get; set; }

    public string Title { get; set; }

    public string Content { get; set; }

    public virtual Category Category { get; set; }
}
