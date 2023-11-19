using AutoMapper;
using College.Domain.DTOs;
using College.Domain.Models;

namespace College.API.Mappers;

public class PageMapperProfile : Profile
{
    public PageMapperProfile()
    {
        CreateMap<PageDto, Page>()
            .ForMember(x => x.Template, opts => opts.MapFrom(x => x.Template))
            .ReverseMap();
    }
}