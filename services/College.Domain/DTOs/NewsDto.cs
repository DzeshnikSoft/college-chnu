namespace College.Domain.DTOs;

public class NewsDto
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public string Content { get; set; }

    public bool? Pinned { get; set; }

    public ImageDto Image { get; set; }

    public DateTime? Date { get; set; }
}