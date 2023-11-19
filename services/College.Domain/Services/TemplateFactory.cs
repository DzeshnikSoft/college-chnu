using College.Domain.DTOs;
using College.Domain.Enumerations;
using College.Domain.Models;

namespace College.Domain.Services;

public interface ITemplateFactory
{
    Template Create(TemplateDto templateDto);
}

public class TemplateFactory : ITemplateFactory
{
    public Template Create(TemplateDto templateDto)
    {
        return templateDto.Type switch
        {
            TemplateType.Default => new Template { Type = TemplateType.Default },
            TemplateType.HeaderWithImageAndTitle => new Template
            {
                Type = templateDto.Type,
                Image = new Image
                {
                    Alt = templateDto.Image.Alt, Url = templateDto.Image.Url
                },
                Title = templateDto.Label,
            },
            _ => new Template { Type = TemplateType.Default },
        };
    }
}