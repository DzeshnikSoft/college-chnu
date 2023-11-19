using AutoMapper;
using College.Domain.DTOs;
using College.Domain.Models;

namespace College.API.Mappers;

public class TemplateMapperProfile : Profile
{
    public TemplateMapperProfile()
    {
        CreateMap<Template, TemplateDto>()
            .ForMember(x => x.Label, opts => opts.MapFrom(x => x.Title))
            .ForMember(x => x.Image, opts => opts.MapFrom(x => x.Image))
            .ReverseMap();
    }
}