namespace College.Domain.DTOs;

public class PageDto
{
    public Guid Id { get; set; }

    public string CustomUrl { get; set; }

    public string Title { get; set; }

    public string Content { get; set; }
}