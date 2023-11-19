using College.Domain.Enumerations;

namespace College.Domain.DTOs;

public class TemplateDto
{
    public TemplateType Type { get; set; }

    public ImageDto Image { get; set; }

    /// <summary>
    /// For TemplateType.HeaderWithImageAndTitle
    /// </summary>
    public string Label { get; set; }
}