namespace College.Domain.Models;

public class Category
{
    public Guid Id { get; set; }

    /// <summary>
    /// For ex https://college.com/{Url}/...
    /// </summary>
    public string Url { get; set; }

    public string Title { get; set; }

    public ICollection<SubCategory> SubCategories { get; set; }
}
