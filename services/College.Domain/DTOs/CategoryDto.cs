namespace College.Domain.DTOs;

public class CategoryDto
{
    public Guid Id { get; set; }

    public string Url { get; set; }

    public string Title { get; set; }

    public IList<SubCategoryDto> SubCategories { get; set; }
}