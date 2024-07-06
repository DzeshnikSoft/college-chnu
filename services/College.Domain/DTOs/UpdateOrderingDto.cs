namespace College.Domain.DTOs;

public record UpdateCategoryOrderingDto(Guid CategoryId, List<SubCategoryOrderingDto> SubCategories);

public record SubCategoryOrderingDto(Guid SubCategoryId, List<Guid> Pages);