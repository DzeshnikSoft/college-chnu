using College.Domain.DTOs;
using College.Domain.Enumerations;

namespace College.API.ViewModels;

#region Category View Models

public record CategoryViewModel(string Title, string Url);

public record UpdateCategoryViewModel(Guid CategoryId, string? Title, string? Url);

#endregion

#region Subcategory View Models

public record SubCategoryViewModel(Guid CategoryId, string Title, string Url);

public record UpdateSubCategoryViewModel(Guid SubCategoryId, string Title, string Url);

#endregion

#region Pages View Models

public record PageViewModel(
    string Title,
    string Content,
    string Url,
    Guid SubCategoryId,
    TemplateViewModel Template);

public record UpdatePageViewModel(
    Guid Id,
    string Title,
    string Content,
    string Url,
    Guid SubCategoryId,
    TemplateViewModel Template);

#endregion

#region Templates View Models

public record TemplateViewModel(ImageDto? Image, string? Label, TemplateType Type);

#endregion

public record ApiKeyResponse(string ApiKey);