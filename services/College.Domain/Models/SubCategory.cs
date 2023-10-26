namespace College.Domain.Models;

public class SubCategory
{
    public Guid Id { get; set; }

    public string Url { get; set; }

    public string Title { get; set; }

    public Guid CategoryId { get; set; }

    public Category Category { get; set; }

    public ICollection<Page> Pages { get; set; }
}