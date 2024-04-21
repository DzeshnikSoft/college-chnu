namespace College.Domain.Models;

public class News
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public Image Image { get; set; }

    public string Description { get; set; }

    public string Content { get; set; }

    public string TextContent { get; set; }

    public string Url { get; set; }

    public Image TitleBackgroundImage { get; set; }

    public bool? Pinned { get; set; }

    public DateTime Date { get; set; }

    public DateTime CreateDateUtc { get; set; }
}
