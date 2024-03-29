namespace College.Domain.DTOs;

public class PageDto
{
    public Guid Id { get; set; }

    public string Url { get; set; }

    public string Title { get; set; }

    public string Content { get; set; }

    public Guid SubCategoryId { get; set; }

    public TemplateDto Template { get; set; }
}