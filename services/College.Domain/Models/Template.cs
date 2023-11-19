using College.Domain.Enumerations;

namespace College.Domain.Models;

/// <summary>
/// Template for each page (Page view)
/// Need to create new TemplateType dude?
/// Ohh, that`s easy. Add Fields here for your special template.
/// Easy peasy! BOOM 💣
/// </summary>
public class Template
{
    public Guid Id { get; set; }
    /// <summary>
    /// General field
    /// </summary>
    public TemplateType Type { get; set; }

    /// <summary>
    /// Next Two for TemplateType.HeaderWithImageAndTitle
    /// </summary>
    public Image Image { get; set; }

    public string Title { get; set; }

    public Guid PageId { get; set; }
}