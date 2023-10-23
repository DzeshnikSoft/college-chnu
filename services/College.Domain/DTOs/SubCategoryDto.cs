namespace College.Domain.DTOs;

public class SubCategoryDto
{
    public Guid Id { get; set; }

    public string Url { get; set; }

    public string Title { get; set; }

    public IList<PageDto> Pages { get; set; }
}