namespace College.Domain.Models;

public class News
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string MainImage { get; set; }

    public string Description { get; set; }

    public string Content { get; set; }

    public DateTime Date { get; set; }
}
