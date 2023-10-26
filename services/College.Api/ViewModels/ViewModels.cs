namespace College.API.ViewModels;

public record CategoryViewModel(string Title, string Url);

public record SubCategoryViewModel(string Title, string Url);

public record UpdateCategoryViewModel(Guid CategoryId, string? Title, string? Url);