namespace College.Domain.Enumerations;

/// <summary>
/// Type of Page design
/// </summary>
public enum TemplateType
{
    /// <summary>
    /// Only HTML text
    /// </summary>
    Default = 0,
    /// <summary>
    /// Header with full width image and label. Also includes html text.
    /// </summary>
    HeaderWithImageAndTitle = 1,
}